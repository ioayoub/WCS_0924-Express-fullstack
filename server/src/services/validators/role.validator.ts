import { z } from "zod";

const schema = z.object({
  label: z
    .string({
      invalid_type_error: "Le label doit être une chaîne de caractères",
    })
    .min(3, {
      message: "Le label doit contenir au minimum 3 caractères.",
    })
    .max(20, {
      message: "le label doit contenir au maximum 20 caractères.",
    }),
});

type BodyType = {
  label: string;
};

export const validateRoleSchema = (body: BodyType) => {
  const validData = schema.safeParse(body);

  if (!validData.success) {
    const result = validData.error.issues.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    return {
      success: false,
      errors: result,
    };
  }

  return {
    success: true,
  };
};
