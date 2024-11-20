// BASIC METHOD ----------------------------
// export class CreateCatDto {
//   name: string
//   age: number
//   breed: string
// }

import { IsInt, IsString } from 'class-validator';

// ZOD METHOD ----------------------------
// import { z } from 'zod';

// export const createCatSchema = z
//   .object({
//     name: z.string(),
//     age: z.number(),
//     breed: z.string(),
//   })
//   .required();

// export type CreateCatDto = z.infer<typeof createCatSchema>;

// CLASS VALIDATION ----------------------------
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
