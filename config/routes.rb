Rails.application.routes.draw do
  root to: 'pages#index'
  get 'game', to: 'game#show'
  get 'game/new', to: 'game#new'
  post 'game', to: 'game#create'
  delete 'game/leave', to: 'game#destroy'
  resources :gameupdates
  resources :users, only: [:new,:create,:index]
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
