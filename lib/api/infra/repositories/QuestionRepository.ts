import { IQuestionsRepository } from "../../domain/repositories/IQuestionsRepository";
import { Question } from "../../domain/types/entities/Question";
import { BaseRepository } from "../database/postgres/BaseRepository";

export default class QuestionsRepository extends BaseRepository implements IQuestionsRepository {}
