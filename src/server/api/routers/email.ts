import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        fname: z.string(),
        lname: z.string(),
        email: z.string(),
        phone: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { fname, lname, email, phone, message } = input;
      try {
        // const response = await ctx.resend.emails.send({
        await ctx.resend.emails.send({
          from: "max@strukter.io",
          to: "max@strukter.io",
          subject: "Strukter Website Inquiry",
          html: `<p>${message}\n${fname} ${lname}\n${email}\n${phone}</p>`,
        });

        return { success: true };
      } catch (error) {
        return { success: false, error: error };
      }
    }),
});
