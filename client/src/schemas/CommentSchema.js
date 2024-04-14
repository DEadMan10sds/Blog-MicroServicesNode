import { z } from "zod";

const postSchema = z.object({
  comment: z.string().max(50, {
    message: "The name can't be longer than 50 characters.",
  }),
});

export default postSchema;
