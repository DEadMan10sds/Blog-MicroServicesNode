import { z } from "zod";

const postSchema = z.object({
  title: z.string().max(50, {
    message: "The name can't be longer than 50 characters.",
  }),
  data: z.string().max(255, {
    message: "The post can't be longher than 255 characters",
  }),
});

export default postSchema;
