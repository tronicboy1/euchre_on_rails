Rails.application.routes.draw do
  root to: "pages#index"
  get "game", to: "game#show"
  get "game/new", to: "game#new"
  post "game", to: "game#create"
  get "game/leave", to: "game#destroy"
  resources :gameupdates
  resources :users, only: [:new, :create, :index]
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  get "logout", to: "sessions#destroy"
  post "game/leave/json", to: "pages#destroyJson"
  post "login/json", to: "sessions#createJson"
  post "register/json", to: "users#createJson"
  post "game/new/json", to: "game#createJson"
  get "game-updates/json", to: "pages#fetchUpdates"

  mount ActionCable.server, at: "/cable"
end
