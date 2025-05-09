<template>
  <div>
    <div dir="ltr">
      {{ date }}
    </div>
    <UContainer class="mt-10 flex flex-col gap-10 items-center">
      <div class="p-5 bg-gray-300 flex justify-center">
        <p>انتخاب تاریخ</p>
      </div>
      <div v-if="error" class="text-red-500">خطا در دریافت اطلاعات</div>
      <!-- start -->
      <div class="w-[800px] h-[1000px] border border-gray-100 bg-cover rounded-4xl p-5 flex flex-col justify-between"
        id="canva">
        <!-- start -->
        <div
          class="w-full grid grid-cols-3 justify-items-center p-5 bg-[url(images/date.svg)] bg-no-repeat bg-cover rounded-4xl shadow">
          <div class="px-10 py-2 flex flex-col items-center rounded-4xl border bg-white shadow">
            <span class="text-5xl">{{ day }}</span>
            <span class="text-xl">{{ gregorianMonths[month] }}</span>
            <span class="text-xl">{{ year }}</span>
          </div>
          <div class="px-10 py-2 flex flex-col items-center rounded-4xl bg-gray-950 text-white shadow">
            <span class="text-5xl">{{ solarDay }}</span>
            <span class="text-xl">{{ matchDayWeek(solarDayWeek) }}</span>
            <span class="text-xl">{{ sunMonths[solarMonth] }} ماه {{ solarYear }}</span>
          </div>
          <div class="px-10 py-2 flex flex-col items-center rounded-4xl border bg-white shadow">
            <span class="text-5xl">{{ lunarDay }}</span>
            <span class="text-xl">{{ moonMonths[lunarMonth] }}</span>
            <span class="text-xl">{{ lunarYear }}</span>
          </div>
        </div>
        <!-- end -->

        <!-- start -->
        <div
          class="flex flex-col gap-5 p-5 bg-[url(images/azan.png)] bg-no-repeat bg-cover rounded-4xl shadow items-start">
          <span class="text-center font-bold bg-blue-500 rounded-4xl p-2 text-white">اذان به افق شهر تهران</span>
          <div class="w-full grid grid-cols-3 justify-items-center">
            <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-sky-200 shadow shadow">
              <Icon name="solar:sunrise-bold" size="50" />
              <span class="text-2xl">اذان صبح</span>
              <span class="text-xl">03:45</span>
            </div>
            <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-sky-300 shadow">
              <Icon name="solar:sun-bold" size="50" />
              <span class="text-2xl">اذان ظهر</span>
              <span class="text-xl">12:45</span>
            </div>
            <div class="px-10 py-2 flex flex-col items-center justify-around rounded-4xl bg-sky-500 shadow">
              <Icon name="solar:sunset-bold" size="50" />
              <span class="text-2xl">اذان مغرب</span>
              <span class="text-xl">19:45</span>
            </div>
          </div>
        </div>
        <!-- end -->
        <!-- start -->
        <div class="w-full flex justify-center p-5 bg-white rounded-4xl shadow relative">
          <span class="bg-blue-500 text-xl p-2 rounded-t-none w-96 text-center rounded-4xl text-white absolute top-0">
            رویداد ها
          </span>
          <span class="mt-10 font-bold text-2xl text-wrap line-clamp-3">{{ events }}</span>
        </div>
        <!-- end -->
        <!-- start -->
        <div class="w-full flex justify-around gap-5 p-5 bg-white rounded-4xl shadow">
          <div>
            <img src="/images/logo.jpg" alt="LOGO" class="w-[300px] rounded-4xl">
          </div>
          <div class="flex flex-col justify-around items-baseline gap-3" dir="ltr">
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:telegram" size="50" class="text-blue-500" />
              <span>@etehadie_keshbaf</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:instagram" size="50" class="text-red-500" />
              <span>@etehadie_keshbaf</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="simple-icons:gmail" size="50" class="text-red-600" />
              <span>keshbaf@gmail.com</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="solar:phone-calling-bold" size="50" class="text-gray-500" />
              <span>(021) - 77651157</span>
            </div>
            <div class="flex gap-2 justify-center items-center">
              <Icon name="solar:phone-calling-bold" size="50" class="text-gray-500" />
              <span>(021) - 77651258</span>
            </div>
          </div>
        </div>
        <!-- end -->

        <!-- start -->
        <!-- <p class="text-white w-full text-center font-bold">اتحادیه تولیدکنندگان و فروشندگان کالای کشباف و جوراب تهران
        </p> -->
        <!-- end -->

        <!-- Download image button -->
      </div>
      <!-- end -->
      <span class="bg-blue-500 px-10 py-2 rounded-4xl text-white cursor-pointer text-center">دانلود</span>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDateStore } from '@/stores/date'

const days = ["0", "شنبه", "یک شنبه", "دو شنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه",]
const sunMonths = ["0", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
const gregorianMonths = ["0", "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"]
const moonMonths = ["0", "محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانیه", "رجب", "شعبان", "رمضان", "شوال", "ذوالعقده", "ذوالحجه"]

const query = { year: '1404', month: '2', day: '19' }

const dateStore = useDateStore()
const date = await dateStore.getDate(query)

const { error, solarYear, solarMonth, solarDay, solarDayWeek, lunarYear, lunarMonth, lunarDay, year, month, day, events } = dateStore


const matchDayWeek = (word) => {
  return days.filter((w) =>
    w.startsWith(word)
  ).toString()
}


</script>

<style></style>