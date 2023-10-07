import Menu from '../../data/menu.json';
import BonusUI from '../../data/bonusui.json';

const state = {
  data: Menu.data,
  megamenu: BonusUI.data,
  searchData: [],
  togglesidebar: true,
  activeoverlay : false,
  searchOpen : false,
  customizer: '',
  hideRightArrowRTL: false,
  hideLeftArrowRTL: true,
  hideRightArrow: true,
  hideLeftArrow: true,
  width: 0,
  height: 0,
  margin: 0,
  menuWidth: 0,
};

// getters
const getters = {

};

// mutations
const mutations = {
  opensidebar: (state: { togglesidebar: boolean; activeoverlay: boolean; }) => {
    state.togglesidebar = !state.togglesidebar;
    if (window.innerWidth < 991) {
      state.activeoverlay = true;
    } else {
      state.activeoverlay = false;
    }
  },
  resizetoggle: (state: { togglesidebar: boolean; }) => {
    if (window.innerWidth < 1007) {
      state.togglesidebar = false;
      // state.activeoverlay = true
    } else {
      state.togglesidebar = true;
      // state.activeoverlay = false
    }
  },
  searchTerm: (state: { data: any[]; searchData: any[]; }, term: string) => {
    const items: any[] = [];
    const searchval = term.toLowerCase();
    state.data.filter((menuItems: { title: string; type: string; children: any[]; icon: any; }) => {
      
      if (menuItems.title) {
        if (menuItems.title.toLowerCase().includes(searchval) && menuItems.type === 'link') {
          items.push(menuItems);
        }
        if (!menuItems.children) return false;
        menuItems.children.filter((subItems: { title: string; type: string; icon: any; children: any[]; }) => {
          if (subItems.title.toLowerCase().includes(searchval) && subItems.type === 'link') {
            subItems.icon = menuItems.icon;
            items.push(subItems);
          }
          if (!subItems.children) return false;
          subItems.children.filter((suSubItems: { title: string; icon: any; }) => {
            if (suSubItems.title.toLowerCase().includes(searchval)) {
              suSubItems.icon = menuItems.icon;
              items.push(suSubItems);
            }
          });
        });
        state.searchData = items;
      }
    });
  },
  setBonusNavActive: (state: { megamenu: any[]; }, item: { active: boolean; }) => {
    if (!item.active) {
      state.megamenu.forEach((a: { active: boolean; children: any[]; }) => {
        if (state.megamenu.includes(item))
          a.active = false;
        if (!a.children) return false;
        a.children.forEach((b: { active: boolean; }) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  },
  setNavActive: (state: { data: any[]; }, item: { active: boolean; }) => {
   
    if (!item.active) {
      state.data.forEach((a: { active: boolean; children: any[]; }) => {
        if (state.data.includes(item))
          a.active = false;
        if (!a.children) return false;
        a.children.forEach((b: { active: boolean; }) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  },
  setActiveRoute: (state: { data: any[]; }, item: any) => {
    state.data.filter((menuItem: { active: boolean; children: any[]; }) => {
      if (menuItem !== item)
        menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems: { children: string | any[]; active: boolean; }) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }
};

// actions
const actions = {
  opensidebar: (context: { commit: (arg0: string, arg1: any) => void; }, term: any) => {
    context.commit('opensidebar', term);
  },
  resizetoggle: (context: { commit: (arg0: string, arg1: any) => void; }, term: any) => {
    context.commit('resizetoggle', term);
  },
  setBonusNavActive: (context: { commit: (arg0: string, arg1: any) => void; }, term: any) => {
    context.commit('setBonusNavActive', term);
  },
  searchTerm: (context: { commit: (arg0: string, arg1: any) => void; }, term: any) => {
    context.commit('searchTerm', term);
  },
  setNavActive: (context: { commit: (arg0: string, arg1: any) => void; }, item: any) => {
    context.commit('setNavActive', item);
  },
  setActiveRoute: (context: { commit: (arg0: string, arg1: any) => void; }, item: any) => {
    context.commit('setActiveRoute', item);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};