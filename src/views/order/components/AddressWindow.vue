<template>
  <div>
    <div class="address-window" :class="value === true ? 'on' : ''">
      <div class="title">
        选择地址
        <!-- <span class="iconfont icon-guanbi" @click="closeAddress"></span> -->
      </div>
      <div class="list" v-if="addressList.length">
        <div
          class="item acea-row row-between-wrapper"
          v-for="(item, index) in addressList"
          @click="tapAddress(index)"
          :key="index"
        >
        <!-- 图标 -->
          <!-- <span
            class="iconfont icon-ditu"
            :class="item.id === checked ? 'font-color-green' : ''"
          ></span> -->
          <div class="addressTxt">
            <div class="name">
              {{ item.real_name }}
              <span class="phone">{{ item.phone }}</span>
            </div>
            <div class="line1">
              <!-- 省  城市  区  详细地址 -->
              {{ item.province }}{{ item.city }}{{ item.district
              }}{{ item.detail }}
            </div>
          </div>
        </div>
      </div>
      <div class="pictrue" v-if="addressList.length < 1">
        <img src="@/assets/images/noAddress.png" class="image" />
      </div>
      <div class="addressBnt bg-color-green" @click="goAddressPages">
        新加地址
      </div>
    </div>
  </div>
</template>
<script>
import { getAddressList } from "@/api/user";
export default {
  name: "AddressWindow",
  props: {
    value: Boolean,
    checked: Number
  },
  data: function() {
    return {
      addressList: [],
    };
  },
  mounted: function() {},
  methods: {
    // 将每一个新添地址放到 addressList
    getAddressList: function() {
      let that = this;
      getAddressList().then(res => {
        // console.log("新添地址=》74"+res)
        that.addressList = res.data;
      });
    },
    //点击新添地址   
    goAddressPages: function() {
      this.$router.push({ path: "/user/add_address" });
    },
    // 点击已有地址  修改地址
    tapAddress: function(index) {
      // console.log("子传父=》AddressWindow")
      this.$emit("checked", this.addressList[index]);
    }
  }
};
</script>
