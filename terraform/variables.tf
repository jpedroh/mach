variable "vercel_api_token" {
  type      = string
  sensitive = true
}

variable "database_url" {
  type      = string
  sensitive = true
}

variable "aisweb_api_key" {
  type      = string
  sensitive = true
}

variable "aisweb_api_password" {
  type      = string
  sensitive = true
}

variable "base_url" {
  type      = string
  sensitive = false
}

variable "github_token" {
  type      = string
  sensitive = true
}

