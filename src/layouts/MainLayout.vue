<template>
  <q-layout view="lHh Lpr lFf" class="column">
    <q-header elevated>
      <q-toolbar class="row">
        <div class="col row">
          <div v-for="menu in menus" :key="menu.id" class="cursor-pointer non-selectable q-px-md text-h6"
            @click="onClickedMenu(menu)">
            {{ menu.name }}
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item v-for="subMenu in menu.children" :key="subMenu.id" clickable v-close-popup
                  @click="onClickedMenu(subMenu)">
                  <q-item-section>{{ subMenu.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
        <div class="col-1 row justify-end">
          <q-icon class="col-1 cursor-pointer q-px-md" name="settings" size="sm" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="col column">
      <router-view class="col column" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { PolicyManagement } from 'components/management/policy';
import { openPopup } from 'common/popup';
import { DbcManagement } from 'components/management/dbc';

const menus = [
  {
    id: 'management',
    name: 'Management',
    depth: 1,
    children: [
      {
        id: 'policy',
        name: 'Policy',
        depth: 2,
        component: PolicyManagement,
        title: 'Policy Management',
        width: 1000,
        height: 700
      },
      {
        id: 'dbc',
        name: 'DBC',
        depth: 2,
        component: DbcManagement,
        title: 'DBC Management',
        width: 1000,
        height: 700
      }
    ]
  }
]

const onClickedMenu = (item) => {
  if (item.component) {
    openPopup({
      title: item.title,
      width: item.width,
      height: item.height,
      component: item.component,
      componentProps: {},
    });
  }
};
</script>

<style></style>
