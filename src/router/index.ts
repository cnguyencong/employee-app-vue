import {createRouter, createWebHistory} from "vue-router"
import Body from '../components/body.vue';
import Empty from '../components/empty.vue';
import Default from '../pages/dashboard/defaultPage.vue';

const routes =[
    {
        path: process.env.NODE_ENV === "development" ? '/' : '/vue',
        component: process.env.NODE_ENV === "development" ? Body : Empty,
    
        children: [
          {
            path: '',
            name: 'defaultRoot',
            component: Default,
          },
    
        ]
      },
]
const router=createRouter({
    history: createWebHistory(),
    routes
})
export default router