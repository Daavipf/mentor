"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface Props {
  areaInput: string;
  setAreaInput: Dispatch<SetStateAction<string>>;
  availableAreas: string[];
}

export default function AreaSelect({ areaInput, setAreaInput, availableAreas }: Props) {
  return (
    <Select value={areaInput} onValueChange={(e) => setAreaInput(e)} disabled={availableAreas.length === 0}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={availableAreas.length > 0 ? "Selecione uma área..." : "Nenhuma área disponível"} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Áreas</SelectLabel>
          {availableAreas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
