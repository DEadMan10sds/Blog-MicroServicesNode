import commentSchema from "../../schemas/CommentSchema";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

export default function CreateComment({ postId }) {
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const createdComment = await axios.post(
        import.meta.env.VITE_COMMENTS_SERVICE + `posts/${postId}/comments`,
        values
      );

      console.log(values, postId, createdComment);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New comment</FormLabel>
                <FormControl>
                  <Input placeholder="Title of the post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="grow">
            Comment
          </Button>
        </form>
      </Form>
    </div>
  );
}
