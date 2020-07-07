<template>
  <div class="addAddress absolute">
    <div class="list">
      <div class="item acea-row row-between-wrapper">
        <div class="name">姓名</div>
        <input
          type="text"
          placeholder="请输入姓名"
          v-model="userAddress.real_name"
          required
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">联系电话</div>
        <input
          type="text"
          placeholder="请输入联系电话"
          v-model="userAddress.phone"
          requirediu
        />
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">所在地区</div>
        <div
          class="picker acea-row row-between-wrapper select-value form-control"
        >
          <div class="address">
            <div slot="right" @click.stop="show2 = true">
              {{ model2 || "请选择收货地址" }}
            </div>
            <!-- 地址一开始不能展示show2=false  点击请选择收货地址时在出现 -->
            <CitySelect
              ref="cityselect"
              v-model="show2"
              :callback="result2"
              :items="district"
              :ready="ready"
            ></CitySelect>
            <!-- :ready="ready"   请求的数据  城市 省-->
          </div>
        </div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div class="name">详细地址</div>
        <input
          type="text"
          placeholder="请填写具体地址"
          v-model="userAddress.detail"
          required
        />
      </div>
    </div>
    <div class="default acea-row row-middle">
      <div class="select-btn">
        <div class="checkbox-wrapper">
          <label class="well-check"
            ><input
              type="checkbox"
              name=""
              value=""
              @click="ChangeIsDefault"
              :checked="userAddress.is_default ? true : false"
            /><i class="icon"></i><span class="def">设置为默认地址</span></label>
        </div>
      </div>
    </div>
    <div></div>
    <div class="keepBnt bg-color-green" @click="submit">立即保存</div>
  </div>
</template>
<script type="text/babel">
import { CitySelect } from "vue-ydui/dist/lib.rem/cityselect";
//       获取单个地址   设置单个地址
import { getAddress, postAddress } from "@/api/user";
import { getCity } from "@/api/public";
import attrs, { required, chs_phone } from "@/utils/validate";
import { validatorDefaultCatch } from "@/utils/dialog";
import { openAddress } from "@/libs/wechat";
import { isWeixin } from "@/utils";

export default {
  components: {
    CitySelect
  },
  data() {
    return {
      show2: false,
      district: [],
      id: 0,
      userAddress: { is_default: 0 },
      address: {},
      isWechat: isWeixin(),
      ready: false
    };
  },
  mounted: function() {
    let id = this.$route.params.id;
    this.id = id;
    document.title = !id ? "添加地址" : "修改地址";
    this.getUserAddress();
    this.getCityList();
  },
  methods: {
    getCityList: function() {
      let that = this;
      getCity()
        .then(res => {
          that.district = res.data;  // 城市组件  --》获取城市
          that.ready = true;
        })
        .catch(err => {
          that.$dialog.error(err.msg);
        });
    },
    getUserAddress: function() {
      if (!this.id) return false;
      let that = this;
      getAddress(that.id)
        .then(res => {
          that.userAddress = res.data;  //姓名   电话
          that.model2 =
            res.data.province + " " + res.data.city + " " + res.data.district;
          that.address.province = res.data.province;
          that.address.city = res.data.city;
          that.address.city_id = res.data.city_id;
         
        })
        .catch(err => {
          that.$dialog.error(err.msg);
        });
    },
    getAddress() {
      openAddress().then(userInfo => {
        this.$dialog.loading.open();
        // 修改 添加地址
        postAddress({
          id: this.id,
          real_name: userInfo.userName,
          phone: userInfo.telNumber,
          address: {
            province: userInfo.provinceName,
            city: userInfo.cityName,
            district: userInfo.countryName
          },
         
        })
          .then(() => {
            this.$dialog.loading.close();
            this.$dialog.toast({ mes: "添加成功" });
            this.$router.go(-1);
          })
          .catch(err => {
            this.$dialog.loading.close();
            this.$dialog.error(err.msg || "添加失败");
          });
      });
    },
    //异步校验
    async submit() {
      let name = this.userAddress.real_name,
        phone = this.userAddress.phone,
        model2 = this.model2,
        detail = this.userAddress.detail,
        isDefault = this.userAddress.is_default;
      try {
        await this.$validator({
          name: [
            required(required.message("姓名")),
            attrs.range([2, 16], attrs.range.message("姓名"))
          ],
          phone: [
            required(required.message("联系电话")),
            chs_phone(chs_phone.message())
          ],
          model2: [required("请选择地址")],
          detail: [required(required.message("具体地址"))]
        }).validate({ name, phone, model2, detail });
      } catch (e) {
        return validatorDefaultCatch(e);
      }
      try {
        let that = this,
          data = {
            id: that.id,
            real_name: name,
            phone: phone,
            address: this.address,
            detail: detail,
            is_default: isDefault,
            post_code: ""
          };
        postAddress(data)
          .then(function() {
            if (that.id) that.$dialog.toast({ mes: "修改成功" });
            else that.$dialog.toast({ mes: "添加成功" });
            that.$router.go(-1);
          })
          .catch(err => {
            that.$dialog.error(err.msg);
          });
      } catch (e) {
        this.$dialog.error(e.msg);
      }
    },
    //点击设置默认地址
    ChangeIsDefault: function() {
      this.userAddress.is_default = !this.userAddress.is_default;
    },
    result2(ret) {
      this.model2 = ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
      this.address.province = ret.itemName1; 
      this.address.city = ret.itemName2;
      this.address.city_id = ret.itemValue2;
      this.address.district = ret.itemName3;
    }
  }
};
</script>
