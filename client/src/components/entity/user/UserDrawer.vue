<template>
  <div class="pa-5">
    <div class="my-5">
      <v-btn
        v-if="isDrawerCreate"
        text
        outlined
        color="teal accent-10 text"
        class="text-capitalize mr-2"
        @click="submit"
      >
        Создать
      </v-btn>

      <v-btn
        v-else
        text
        outlined
        :disabled="!isUserModified"
        class="text-capitalize mr-2"
        @click="submit"
      >
        Обновить
      </v-btn>

      <v-btn
        text
        outlined
        color="red lighten-1"
        class="text-capitalize mr-2"
        @click="$emit('onUserDelete')"
      >
        Удалить
      </v-btn>
    </div>

    <v-divider></v-divider>

    <v-card dense flat :loading="isLoading" class="my-4 py-4">
      <el-form
        :model="formData"
        :inline-message="true"
        :rules="formRules"
        ref="form"
      >
        <v-row>
          <v-col lg="3">
            <el-form-item label="Фамилия" prop="lastName" required>
              <el-input v-model="formData.lastName" size="small"></el-input>
            </el-form-item>

            <el-form-item label="Имя" prop="firstName" required>
              <el-input v-model="formData.firstName" size="small"></el-input>
            </el-form-item>

            <el-form-item label="Отчество" prop="patronymic">
              <el-input v-model="formData.patronymic" size="small"></el-input>
            </el-form-item>
          </v-col>

          <v-col lg="3">
            <el-form-item label="Город проживания" prop="city" required>
              <el-input v-model="formData.city" size="small"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="email" required>
              <el-input v-model="formData.email" size="small"></el-input>
            </el-form-item>

            <el-form-item label="Телефон" prop="phone" required>
              <el-input
                v-model="formData.phone"
                type="tel"
                size="small"
                v-mask="'+7##########'"
                placeholder="+7999999999"
                clearable
              ></el-input>
            </el-form-item>
          </v-col>

          <v-col lg="3">
            <el-form-item label="Дата рождения" prop="birthday">
              <el-date-picker
                v-model="formData.birthday"
                type="date"
                size="small"
                format="dd-MM-yyyy"
                value-format="dd-MM-yyyy"
                v-mask="'##-##-####'"
                clearable
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-checkbox
                v-model="formData.citizenship"
                label="Гражданин РФ"
              ></el-checkbox>
            </el-form-item>
          </v-col>

          <v-col>
            <template v-if="!isDrawerCreate">
              <div class="mb-5">Изображение:</div>
              <el-upload
                class="image-uploader"
                action="#"
                accept="image/png, image/jpeg"
                :before-upload="beforeImageUpload"
                :http-request="fakeUploadRequest"
                :show-file-list="false"
              >
                <i
                  v-if="formData.image == null"
                  class="el-icon-plus image-uploader-icon"
                ></i>
                <img
                  v-else
                  class="image"
                  :src="isImageHasBlob ? image : formData.image"
                />
              </el-upload>

              <div v-if="formData.image" class="my-3">
                <v-btn
                  text
                  outlined
                  class="text-capitalize mr-1"
                  @click="removeImage"
                  >удалить</v-btn
                >
                <v-btn
                  v-if="isImageHasBlob"
                  text
                  outlined
                  class="text-capitalize mr-1"
                  @click="uploadImage"
                  >загрузить</v-btn
                >
              </div>
            </template>
          </v-col>
        </v-row>
      </el-form>
    </v-card>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { deepDiffObject } from "@/utils/common";
import userService from "@/services/userService";
import {
  сyrillicValidator,
  birthdayValidator,
  emailValidator,
  phoneNumberValidator,
} from "@/utils/validation";

export default {
  mixins: [userService],
  directives: { mask },

  data() {
    return {
      isDrawerCreate: false,
      isLoading: false,
      formData: {},
      image: "",

      formRules: {
        firstName: [
          {
            required: true,
            validator: (rule, firstName, callback) =>
              сyrillicValidator(firstName)
                ? callback()
                : callback(
                    new Error("Провеьте корректность заполненных данных")
                  ),
          },
        ],

        lastName: [
          {
            required: true,
            validator: (rule, lastName, callback) =>
              сyrillicValidator(lastName)
                ? callback()
                : callback(
                    new Error("Провеьте корректность заполненных данных")
                  ),
          },
        ],

        patronymic: [
          {
            required: false,
            validator: (rule, patronymic, callback) => {
              if (patronymic == undefined || patronymic == "")
                return callback();

              сyrillicValidator(patronymic)
                ? callback()
                : callback(
                    new Error("Провеьте корректность заполненных данных")
                  );
            },
          },
        ],

        city: [
          {
            required: true,
            validator: (rule, city, callback) =>
              сyrillicValidator(city)
                ? callback()
                : callback(
                    new Error("Провеьте корректность заполненных данных")
                  ),
          },
        ],

        email: [
          {
            required: true,
            validator: (rule, email, callback) =>
              emailValidator(email)
                ? callback()
                : callback(new Error("Провеьте правильность заполнения email")),
          },
        ],

        birthday: [
          {
            required: true,
            validator: (rule, birthday, callback) =>
              birthdayValidator(birthday)
                ? callback()
                : callback(new Error("Укажите дату рождения")),
          },
        ],

        phone: [
          {
            required: true,
            validator: (rule, phone, callback) =>
              phoneNumberValidator(phone)
                ? callback()
                : callback(new Error("Укажите номер телефона")),
          },
        ],
      },
    };
  },

  computed: {
    user() {
      return this.$store.getters["users/drawer"];
    },

    isUserModified() {
      return !_.isEqual(this.user, this.formData);
    },

    isImageHasBlob() {
      return this.image.indexOf("blob") !== -1;
    },
  },

  activated() {
    this.refreshData();
  },

  created() {
    this.refreshData();
  },

  methods: {
    async submit() {
      try {
        await this.$refs.form.validate();
      } catch (e) {
        return;
      }

      try {
        this.isLoading = true;

        this.isDrawerCreate
          ? await this.createUser(this.formData)
          : await this.updateUser({
              id: this.user.id,
              params: deepDiffObject(this.user, this.formData),
            });

        this.$emit("onDrawerClose");
        this.$onSuccess();
      } catch (e) {
        this.$onError();
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async uploadImage() {
      try {
        this.isLoading = true;

        const formData = new FormData();
        formData.append("id", this.user.id);
        formData.append("image", this.formData.image);

        await this.uploadAvatar(formData);

        this.$onSuccess();
      } catch (e) {
        console.error(e);
        this.$onError();
      } finally {
        this.isLoading = false;
      }
    },

    async removeImage() {
      if (this.isDrawerCreate) return this.purgeImage();

      try {
        this.isLoading = true;

        await this.detachAvatar(this.user.id);
        this.purgeImage();
        this.$onSuccess();
      } catch (e) {
        console.error(e);
        this.$onError();
      } finally {
        this.isLoading = false;
      }
    },

    fakeUploadRequest({ file }) {
      this.formData.image = file;
      this.image = URL.createObjectURL(file);
    },

    beforeImageUpload(file) {
      const isJPG = /png|jpg|jpeg/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$onWarning("Принимаются изображения формата png, jpeg");
      }
      if (!isLt2M) {
        this.$onWarning("Изображение не должно превышать 5 мб");
      }
      return isJPG && isLt2M;
    },

    purgeImage() {
      this.image = "";
      this.formData.image = null;
    },

    refreshData() {
      // Create drawer
      if (_.isEmpty(this.user)) {
        this.formData = {};
        this.isDrawerCreate = true;

        if (_.has(this.$refs, "form")) {
          this.$refs.form.clearValidate();
          this.$refs.form.resetFields();
        }
      }
      // Update drawer
      else {
        this.formData = _.cloneDeep(this.user);
        this.image = "";
        this.isDrawerCreate = false;
      }
    },
  },
};
</script>

<style>
.image-uploader {
  margin-left: auto;
}

.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.imag e-uploader .el-upload:hover {
  border-color: var(--color-font__primary);
}

.image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.image {
  width: 250px;
  height: auto;
  display: block;
}
</style>
