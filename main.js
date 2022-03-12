(()=>{"use strict";const e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_error"};class t{constructor({data:e,handleCardClick:t,handleAddLikeClick:s,handleDeleteLikeClick:i,handleDeleteIconClick:r},n){this._name=e.name,this._link=e.link,this._likes=e.likes,this._cardId=e._id,this._userId=e.userId,this._ownerId=e.owner._id,this._cardSelector=n,this._handleCardClick=t,this._handleLikeClick=s,this._handleDeleteLikeClick=i,this._handleDeleteIconClick=r}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".elements__position").cloneNode(!0)}getCard(){return this._element=this._getTemplate(),this._element.querySelector(".elements__title").textContent=this._name,this._elementsItem=this._element.querySelector(".elements__item"),this._elementsItem.src=this._link,this._elementsItem.alt=this._name,this._likeCard=this._element.querySelector(".elements__like"),this._cardTrash=this._element.querySelector(".elements__trash"),this._likeToggle(),this._getTrashById(),this._setEventListeners(),this._element}_likeToggle(){this._element.querySelector(".elements__likes").textContent=this._likes.length,this._likeById()?this._likeCard.classList.add("elements__like_active"):this._likeCard.classList.remove("elements__like_active")}_likeById(){return this._likes.some((e=>e._id===this._userId))}checkYourLikes(e){this._likes=e.likes,this._likeToggle()}getCardId(){return this._cardId}_getTrashById(){this._ownerId!==this._userId&&this._cardTrash.remove()}deleteByTrash(){this._element.remove(),this._element=null}_setEventListeners(){this._likeCard.addEventListener("click",(()=>{this._likeCard.classList.contains("elements__like_active")?this._handleLikeClick(this._cardId):this._handleDeleteLikeClick(this._cardId)})),this._cardTrash.addEventListener("click",(()=>this._handleDeleteIconClick(this._cardId))),this._elementsItem.addEventListener("click",(()=>this._handleCardClick({link:this._link,name:this._name})))}}class s{constructor(e,t){this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._form=document.querySelector(t)}_showInputError(e,t){const s=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),s.textContent=t}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent=""}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}toggleButtonState(){this._hasInvalidInput()?(this._button.disabled=!0,this._button.classList.add(this._inactiveButtonClass)):(this._button.disabled=!1,this._button.classList.remove(this._inactiveButtonClass))}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_setEventListeners(){this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._button=this._form.querySelector(this._submitButtonSelector),this.toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this.toggleButtonState()}))}))}resetValidation(){this.toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._setEventListeners()}}class i{constructor(e){this._element=document.querySelector(e)}open(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose=e=>{if("Escape"===e.key){const e=document.querySelector(".popup_opened");this.close(e)}};setEventListeners(){this._element.addEventListener("mousedown",(e=>{e.target.classList.contains("popup_opened")&&this.close(),e.target.classList.contains("popup__close")&&this.close()}))}}class r extends i{constructor({popupSelector:e,handleFormSubmit:t}){super(e),this._handleFormSubmit=t,this._formSelector=this._element.querySelector(".popup__form"),this._inputList=this._element.querySelectorAll(".popup__input"),this._buttonSelector=this._element.querySelector(".popup__save-button"),this._buttonDefault=this._buttonSelector.textContent}_getInputValues(){return this._formValues={},this._inputList.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}getLoadingSave(e){this._buttonSelector.textContent=e?this._buttonDefault:"Сохранение..."}setEventListeners(e){this._element.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())})),super.setEventListeners(e)}close(){this._formSelector.reset(),super.close()}}const n=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-button"),a=document.querySelector(".profile__avatar-button"),l=document.querySelector(".popup__input_profile_title"),h=document.querySelector(".popup__input_profile_subtitle"),_=document.querySelector(".elements__items"),c=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_getResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then((e=>this._getResponse(e)))}addCard(e){return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.heading,link:e.link})}).then((e=>this._getResponse(e)))}deleteByTrash(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._getResponse(e)))}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then((e=>this._getResponse(e)))}replaceUserInfo(e){return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.job})}).then((e=>this._getResponse(e)))}replaceAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then((e=>this._getResponse(e)))}addLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._parseResponse(e)))}deleteLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._parseResponse(e)))}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-33",headers:{authorization:"e4ee2037-6e1d-4a6c-990c-3cb9c7537a60","Content-Type":"application/json"}});let d;function u(e){const s=new t({data:e,userId:d,handleCardClick:e=>{f.open(e)},handleAddLikeClick:e=>{c.addLike(e).then((t=>{e.checkYourLikes(t)})).catch((e=>console.log(`Ошибка при добавление лайка: ${e}`)))},handleDeleteLikeClick:e=>{c.deleteLike(e).then((t=>{e.checkYourLikes(t)})).catch((e=>console.log(`Ошибка на отмену лайка: ${e}`)))},handleDeleteIconClick:e=>{k.open(),k.setSubmitHandlerChange((()=>{c.deleteCard(e).then((()=>{k.close(),e.deleteByTrash()})).catch((e=>console.log(`Ошибка при клике на корзину: ${e}`)))}))}},"#card").getCard();return s}Promise.all([c.getInitialCards(),c.getUserInfo()]).then((([e,t])=>{d=t._id,m.setUserInfo(t),p.renderer(e)})).catch((e=>console.log(`Ошибка: ${e}`)));const p=new class{constructor({items:e,renderer:t},s){this._renderedItems=e,this._renderer=t,this._container=s}addItem(e){this._container.prepend(e)}renderer(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}({renderer:e=>{const t=u(e);p.addItem(t)}},_),m=new class{constructor({profileName:e,profileJob:t,profileAvatar:s}){this._profileName=document.querySelector(e),this._profileJob=document.querySelector(t),this._profileAvatar=document.querySelector(s)}getUserInfo(){return{name:this._profileName.textContent,job:this._profileJob.textContent,avatar:this._profileAvatar.src}}setUserInfo({name:e,job:t}){this._profileName.textContent=e,this._profileJob.textContent=t}setUserAvatar({avatar:e}){this._profileAvatar.src=e}}({profileName:".profile__name",profileJob:".profile__job",profileAvatar:".profile__avatar"}),v=new r({popupSelector:".popup_type_edit",handleFormSubmit:e=>{v.getLoadingSave(!0),c.replaceUserInfo(e).then((e=>{m.setUserInfo(e),v.close()})).catch((e=>console.log(`Ошибка при изменении данных пользователя: ${e}`))).finally((()=>v.getLoadingSave(!1))),b.toggleButtonState()}});v.setEventListeners();const S=new r({popupSelector:".popup_type_add",handleFormSubmit:e=>{S.getLoadingSave(!0),c.addCard(e).then((e=>{p.addItem(u({link:e.link,name:e.heading})),S.close()})).catch((e=>console.log(`Ошибка при создание карточки: ${e}`))).finally((()=>S.getLoadingSave(!1))),L.toggleButtonState()}});S.setEventListeners();const g=new r({popupSelector:".popup_type_avatar",handleFormSubmit:e=>{g.getLoadingSave(!0),c.replaceAvatar(e).then((e=>{m.setUserAvatar(e),g.close()})).catch((e=>console.log(`Ошибка при изменени на аватар: ${e}`))).finally((()=>g.getLoadingSave(!1))),C.toggleButtonState()}});g.setEventListeners();const k=new class extends i{constructor({popupSelector:e}){super(e)}setEventListeners(){this._element.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit()})),super.setEventListeners()}setSubmitHandlerChange(e){this._handleFormSubmit=e}}({popupSelector:".popup_type_delete"});k.setEventListeners();const f=new class extends i{constructor(e){super(e),this._cardImage=this._element.querySelector(".popup__image"),this._title=this._element.querySelector(".popup__subtitle")}open({link:e,name:t}){this._title.textContent=t,this._cardImage.setAttribute("src",e),this._cardImage.setAttribute("alt",t),super.open()}}(".popup_type_image");f.setEventListeners();const b=new s(e,".popup_type_edit");b.enableValidation();const L=new s(e,".popup_type_add");L.enableValidation();const C=new s(e,".popup_type_avatar");C.enableValidation(),n.addEventListener("click",(()=>{const e=m.getUserInfo();l.value=e.name,h.value=e.job,v.open(),b.resetValidation()})),o.addEventListener("click",(()=>{S.open(),L.resetValidation()})),a.addEventListener("click",(()=>{g.open(),C.resetValidation()}))})();