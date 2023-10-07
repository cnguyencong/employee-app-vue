
/* eslint-disable */ 
import Layout from '../../data/layout.json';


const state = {
	layout : Layout,
    sidebarType : localStorage.getItem('SidebarType') || 'default',
	boxlayout : true,
	footer: '',
	svg:'stroke-svg',
	sidebar:'compact-sidebar1'
};

// getters
const getters = {
	footer:(state: { footer: any; })=>{
		return state.footer
		},
			sidebar:(state: { sidebar: any; })=>{
				return state.sidebar
				
			},
};

// mutations
const mutations = {
	setFooter:(state: { footer: any; },payload: { class: any; })=>{
		state.footer=payload.class
	},
	set: (state: { layout: { color: { mix_layout: string; primary_color: any; secondary_color: any; layout_version: any; }; settings: { layout_type: string; }; }; }) => {
		document.body.className = state.layout.color.mix_layout;
		document.body.setAttribute('main-theme-layout', 'compact-wrapper');
		document.getElementsByTagName('html')[0].setAttribute('dir', state.layout.settings.layout_type);
		var primaryColor = localStorage.getItem('primary_color') || state.layout.color.primary_color;
		var secondaryColor = localStorage.getItem('secondary_color') || state.layout.color.secondary_color;
		var layoutVersion = localStorage.getItem('layoutVersion') || state.layout.color.layout_version;
		if (primaryColor || secondaryColor) {
			addStyle(primaryColor, secondaryColor);
			if (layoutVersion)
				document.body.className = layoutVersion;
		}
	},
	setLayoutType: (state: { layout: { settings: { layout_type: any; }; }; }, payload: { class: string; }) => {
		// if (payload == 'box-layout') {
		// 	document.body.classList.add(payload);
		// }
		// else if (payload == 'ltr' || payload == 'rtl') {
		// 	document.body.className = document.body.className.replace("box-layout","");
		// }
		// document.body.setAttribute('class', payload);
		// document.body.setAttribute('main-theme-layout', payload);
		document.body.classList.remove('rtl')
		document.body.classList.remove('ltr')
		document.body.classList.remove('boxed')
		document.documentElement.removeAttribute('dir')
		payload.class && document.body.setAttribute('class', payload.class);
		console.log("payload is :>",payload.class)
		payload.class && document.documentElement.setAttribute('dir', payload.class);

		// if (payload == 'ltr') {
		// 	document.body.classList.remove('rtl');
		// } else if (payload == 'rtl') {
		// 	document.body.classList.add(payload);
		// }
		state.layout.settings.layout_type = payload;
		// document.getElementsByTagName('html')[0].setAttribute('dir', payload);
	},
	setLayout: (state: any, payload: { class: string; }) => { 
		 if(document.body.className == 'box-layout'){
        document.body.className = 'box-layout '+ payload.class

      }
      else{

        document.body.className = payload.class;
      }
	},
	setColorScheme: (state: { primaryColor: any; secondaryColor: any; layout: { color: { layout_version: string; }; }; }, payload: { primary: any; secondary: any; }) => {
		setColor(state, payload);
		state.primaryColor = payload.primary;
		state.secondaryColor = payload.secondary;
		state.layout.color.layout_version = 'light';
		localStorage.setItem('layoutVersion', state.layout.color.layout_version);
	},
	setColorDarkScheme: (state: { layout: { color: { layout_version: string; }; }; }, payload: any) => {
		setColor(state, payload);
		state.layout.color.layout_version = 'dark-only';
		localStorage.setItem('layoutVersion', state.layout.color.layout_version);
	},
	// setCustomizeSidebarType: (state, payload) => {
	// 	localStorage.setItem('SidebarType', payload);
	// },
	setCustomizeSidebarType: (state: any, payload: string) => {
		// var obj= document.getElementById('pageWrapper')
		
		// console.log("payload comming =>",payload)
		// if(payload=='horizontal-wrapper'){
		// 	obj.className=''
		// 	localStorage.setItem('SidebarType', payload);
		// state.sidebar=payload
		// }
		// else if(payload=='compact-sidebar1'){
		// 	obj.className=''
		// 	localStorage.setItem('SidebarType', payload);
		// state.sidebar=payload
		// }
		// else{

			localStorage.setItem('SidebarType', payload);
			// state.sidebar=
		// }
	},
	setSvg(state: { svg: any; },payload: any){
		state.svg=payload

	}
};

// actions
const actions = {
	set: (context: { commit: (arg0: string) => void; }) => {
		context.commit('set');
	},
	setLayoutType: (context: { commit: (arg0: string, arg1: any) => void; }, payload: any) => {
		context.commit('setLayoutType',payload);
	},
	setLayout: (context: { commit: (arg0: string, arg1: any) => void; }, payload: any) => {
		context.commit('setLayout',payload);
	},
	setColorScheme: (context: { commit: (arg0: string, arg1: any) => void; }, payload: any) => {
		context.commit('setColorScheme',payload);
	},
	setColorDarkScheme: (context: { commit: (arg0: string, arg1: any) => void; }, payload: any) => {
		context.commit('setColorDarkScheme',payload);
	},
	// setCustomizeSidebarType: (context, payload) => {
	// 	context.commit('setCustomizeSidebarType',payload);
	// },
	setCustomizeSidebarType: (context: { commit: (arg0: string, arg1: any) => void; }, payload: any) => {
		context.commit('setCustomizeSidebarType',payload);
	},
	setSvg(context: { commit: (arg0: string, arg1: any) => void; },payload: any){
		context.commit('setSvg',payload)
	}
};

function addStyle(primary: string | null, secondary: string | null) {
	document.documentElement.style.setProperty('--theme-deafult', primary);
	document.documentElement.style.setProperty('--theme-secondary', secondary);
}

function setColor(state: any, color: { primary: string; secondary: string; }) {
	addStyle(color.primary, color.secondary);
	localStorage.setItem('primary_color', color.primary);
	localStorage.setItem('secondary_color', color.secondary);
	// window.location.reload();
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
