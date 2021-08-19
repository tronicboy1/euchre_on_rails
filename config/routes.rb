Rails.application.routes.draw do
  root 'pages#root'
  resources :gameupdates, only: [:show]
end
