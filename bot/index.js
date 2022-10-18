require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);
const UserController = require("../routes/controllers/user_controller");

bot.start((ctx) =>
  ctx.replyWithHTML(
    `Добро пожаловать, <b>${
      ctx.message.from.first_name ? ctx.message.from.first_name : "неизвестный"
    }</b>.\nДля дальнейшего пользования, вам необходимо авторизоваться`,
    {
      ...Markup.keyboard([Markup.button.contactRequest("Поделиться")]).resize(),
    }
  )
);

bot.on("contact", async (ctx) => {
  try {
    console.log(ctx.update.message.contact.phone_number);
    await ctx.reply("Спасибо тебе)");
    UserController.connect({
      phoneBot: ctx.update.message.contact.phone_number,
      roleBot: "USER",
    });
  } catch (err) {
    console.error(err);
  }
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
