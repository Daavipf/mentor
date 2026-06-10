import { pool } from "./pgConnection";
import { QueryResult, PoolClient, QueryResultRow } from "pg";

export abstract class BaseRepository {
  /**
   * Método auxiliar para gerenciar a execução da query,
   * usando um Client específico (se em transação) ou o Pool global.
   */
  private getRunner(client?: PoolClient) {
    return client || pool;
  }

  /**
   * Método que executa uma query de leitura
   * @param sql A query SQL como texto simples
   * @param params Parâmetros da query
   * @param client Cliente que executara a query
   * @returns Linhas da tabela ou nada
   */
  protected async query<T extends QueryResultRow>(sql: string, params: any[] = [], client?: PoolClient): Promise<T[]> {
    try {
      const runner = this.getRunner(client);
      const result: QueryResult<T> = await runner.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error("[Database Query Error]:", error);
      throw error;
    }
  }

  /**
   * Método que executa uma query de escrita (INSERT, UPDATE, DELETE)
   * @param sql A query SQL como texto simples
   * @param params Parâmetros da query
   * @param client Cliente que executara a query
   * @returns Número de linhas afetadas pela query
   */
  protected async execute(sql: string, params: any[] = [], client?: PoolClient): Promise<number> {
    try {
      const runner = this.getRunner(client);
      const result = await runner.query(sql, params);
      return result.rowCount ?? 0;
    } catch (error) {
      console.error("[Database Execute Error]:", error);
      throw error;
    }
  }

  /**
   * Executa um bloco de operações dentro de uma única transação (ACID).
   * @param callback Função que recebe o client da transação e executa as queries.
   */
  protected async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await callback(client);

      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("[Database Transaction Error - Rolled Back]:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
