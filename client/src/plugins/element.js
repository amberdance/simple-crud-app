import Vue from "vue";
import lang from "element-ui/lib/locale/lang/ru-RU";
import locale from "element-ui/lib/locale";
import "@/styles/element-variables.scss";
import {
  MessageBox,
  Drawer,
  Form,
  FormItem,
  Select,
  Checkbox,
  Input,
  ButtonGroup,
  Divider,
  DatePicker,
  Upload,
} from "element-ui";

[
  Drawer,
  Form,
  FormItem,
  Select,
  Checkbox,
  Input,
  Divider,
  ButtonGroup,
  DatePicker,
  Upload,
].forEach((c) => Vue.use(c));

locale.use(lang);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
