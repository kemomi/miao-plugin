import { Character } from "../components/models.js";
import { Cfg } from "../components/index.js";
import { segment } from "oicq";
import lodash from "lodash";

const _path = process.cwd();
const helpFilePath = `${_path}/plugins/miao-plugin/resources/help/help-list.js`;

export async function help(e, { render }) {
  let bg = Character.getRandomImg('party');
  let helpFile = {};

  helpFile = await import(`file://${helpFilePath}?version=${new Date().getTime()}`);

  const { helpCfg } = helpFile;

  lodash.forEach(helpCfg, (group) => {
    lodash.forEach(group.list, (help) => {
      let icon = help.icon * 1;
      if (!icon) {
        help.css = `display:none`;
      } else {
        let x = (icon - 1) % 10, y = (icon - x - 1) / 10;
        help.css = `background-position:-${x * 50}px -${y * 50}px`;
      }

    })
  });

  let base64 = await render("help", "index", {
    helpCfg,
    bg,
    cfgScale: Cfg.scale(1)
  }, "png");
  if (base64) {
    e.reply(segment.image(`base64://${base64}`));
  }
  return true;
}