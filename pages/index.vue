<template>
  <div>
    <UContainer class="mt-10 flex flex-col gap-10 items-center">
      <div class="p-5 bg-gray-300 flex flex-col gap-3 justify-center">
        <p>انتخاب تاریخ</p>
        <DatePicker :column="1" mode="single" v-model="selectDate" />
      </div>
      <div v-if="error" class="text-[#ef4444]">خطا در دریافت اطلاعات</div>
      <!-- start -->
      <div class="flex items-center gap-3" v-if="loading">
        <Icon name="png-spinners:90-ring-with-bg" size="30" />
        <span>درحال دریافت اطلاعات</span>
      </div>
      <div
        class="w-[800px] h-[1000px] border border-[#f3f4f6] bg-[#ffffff] p-5 flex-col gap-5 justify-between shadow-xl relative hidden lg:flex"
        id="canva">
        <div
          class="z-10 w-full h-full bg-[#e5e7eb] absolute opacity-90 rounded-4xl left-0 top-0 flex items-center justify-center"
          v-if="loading">
          <div class="flex items-center gap-3">
            <Icon name="png-spinners:90-ring-with-bg" size="30" />
            <span>درحال دریافت اطلاعات</span>
          </div>
        </div>
        <!-- start -->
        <div class="bg-[url(images/date.png)] bg-no-repeat bg-cover rounded-4xl shadow">
          <div class="w-full grid grid-cols-3 justify-items-center rounded-4xl p-5">
            <div class="px-10 py-2 flex flex-col items-center rounded-4xl bg-[#030712] text-[#ffffff]">
              <span class="text-5xl">{{ day }}</span>
              <span class="text-xl">{{ gregorianMonths[month] }}</span>
              <span class="text-xl">{{ year }}</span>
            </div>
            <div class="px-10 py-2 flex flex-col items-center rounded-4xl bg-[#ffffff] text-[#000000] shadow">
              <span class="text-5xl">{{ solarDay }}</span>
              <span class="text-xl">{{ matchDayWeek(solarDayWeek) }}</span>
              <span class="text-xl">{{ sunMonths[solarMonth] }} ماه {{ solarYear }}</span>
            </div>
            <div class="px-10 py-2 flex flex-col items-center rounded-4xl bg-[#030712] text-[#ffffff]">
              <span class="text-5xl">{{ lunarDay }}</span>
              <span class="text-xl">{{ moonMonths[lunarMonth] }}</span>
              <span class="text-xl">{{ lunarYear }}</span>
            </div>
          </div>
        </div>
        <!-- end -->

        <!-- start -->
        <div class="bg-[url(images/azan.png)] bg-no-repeat bg-cover rounded-4xl">
          <div class="flex flex-col gap-5 shadow items-start p-5 rounded-4xl">
            <span class="text-center font-bold bg-[#3b82f6] rounded-4xl p-2 text-[#ffffff] self-center">اذان به افق شهر
              تهران</span>
            <div class="w-full flex items-center justify-between">
              <div class="bg-[#ffffff] p-2 flex gap-2 items-center rounded-4xl">
                <span>طلوع آفتاب:</span>
                <span>{{ toluAftab }}</span>
              </div>
              <div class="bg-[#ffffff] p-2 flex gap-2 items-center rounded-4xl">
                <span>غروب آفتاب:</span>
                <span>{{ ghorubAftab }}</span>
              </div>
            </div>
            <div class="w-full grid grid-cols-3 justify-items-center">
              <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-[#bfdbfe] shadow">
                <Icon name="solar:sunrise-bold" size="50" />
                <span class="text-2xl">اذان صبح</span>
                <span class="text-xl">{{ azanSobh }}</span>
              </div>
              <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-[#93c5fd] shadow">
                <Icon name="solar:sun-bold" size="50" />
                <span class="text-2xl">اذان ظهر</span>
                <span class="text-xl">{{ azanZohr }}</span>
              </div>
              <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-[#3b82f6] shadow">
                <Icon name="solar:sunset-bold" size="50" />
                <span class="text-2xl">اذان مغرب</span>
                <span class="text-xl">{{ azanMaghreb }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
        <!-- start -->
        <div class="w-full flex justify-center p-5 bg-[url(images/events.png)] rounded-4xl shadow relative">
          <span
            class="bg-[#3b82f6] text-xl p-2 rounded-t-none w-96 text-center rounded-4xl text-[#ffffff] absolute top-0">
            رویداد ها
          </span>
          <span class="mt-10 font-bold text-[#ffffff] text-2xl text-wrap line-clamp-3" v-if="events">{{ events }}</span>
          <span class="mt-10 text-xl text-[#ffffff]" v-else>برای این روز رویدادی ثبت
            نشده است.</span>
        </div>
        <!-- end -->
        <!-- start -->
        <div class="w-full flex justify-around gap-5 p-5 bg-[url(images/info.png)] rounded-4xl shadow">
          <div>
            <img src="/images/logo.jpg" alt="LOGO" class="w-[300px] rounded-4xl">
          </div>
          <div class="flex flex-col justify-around items-baseline gap-3" dir="ltr">
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:telegram" size="50" class="text-[#3b82f6]" />
              <span class="text-[#ffffff]">@etehadie_keshbaf</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:instagram" size="50" class="text-[#ef4444]" />
              <span class="text-[#ffffff]">@etehadie_keshbaf</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:gmail" size="50" class="text-[#dc2626]" />
              <span class="text-[#ffffff]">keshbaf@gmail.com</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="solar:phone-calling-bold" size="50" class="text-cd[#ffffff]" />
              <span class="text-[#ffffff]">(021) - 77651157</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="solar:phone-calling-bold" size="50" class="text-cd[#ffffff]" />
              <span class="text-[#ffffff]">(021) - 77651258</span>
            </div>
          </div>
        </div>
        <!-- end -->

        <!-- Download image button -->
      </div>
      <!-- end -->
      <button class="bg-[#3b82f6] px-10 py-2 rounded-4xl text-[#ffffff] cursor-pointer text-center disabled:opacity-75"
        :disabled="loading" @click="downloadImage">دانلود</button>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import DatePicker from '@alireza-ab/vue3-persian-datepicker';
import { useDateFormat, useNow } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useDateStore } from '@/stores/date'
import html2canvas from 'html2canvas'
import * as htmlToImage from 'html-to-image';
import { tryOnBeforeMount } from '@vueuse/core'


tryOnBeforeMount(() => {
  converToImage('canva')
})


const loading = ref(false)

const days = ["0", "شنبه", "یک شنبه", "دو شنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه",]
const sunMonths = ["0", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
const gregorianMonths = ["0", "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"]
const moonMonths = ["0", "محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانیه", "رجب", "شعبان", "رمضان", "شوال", "ذوالعقده", "ذوالحجه"]

const today = useDateFormat(useNow(), 'YYYY/MM/DD').value
const selectDate = ref(today)

const query = ref(useConvertToSunDate(selectDate.value))



const dateStore = useDateStore()
await dateStore.getDate(query)
await dateStore.getAzan(query)

const { error, solarYear, solarMonth, solarDay, solarDayWeek, lunarYear, lunarMonth, lunarDay, year, month, day, events, azanSobh, azanZohr, azanMaghreb, nimehShab, toluAftab, ghorubAftab } = storeToRefs(dateStore)


const matchDayWeek = (word) => {
  return days.filter((w) =>
    w.startsWith(word)
  ).toString()
}



watch(selectDate, async (val) => {
  if (val) {
    loading.value = true
    query.value = useConvertToSunDate(val)
    await dateStore.getDate(query.value)
    await dateStore.getAzan(query.value)
    converToImage('canva')
    loading.value = false
  }
})

const downloadImageUrl = ref('')

async function convertHTMLtoImage(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    const dataUrl = await htmlToImage.toPng(element, {
      width: 800,
      height: 1000,
      style: {
        display: 'flex'
      }
    });
    return dataUrl;
  } catch (error) {
    console.error("Error converting HTML to image:", error);
    return null;
  }

}

const converToImage = (elementId: string) => {
  loading.value = true
  convertHTMLtoImage(elementId).then(dateURL => {
    if (dateURL) {
      downloadImageUrl.value = dateURL
    }
  })
  loading.value = false
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = downloadImageUrl.value
  link.download = "taghvim"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

</script>

<style></style>