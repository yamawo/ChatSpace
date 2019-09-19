Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :update, :edit] do
    resources :messages, only: [:index, :create]
  end
end