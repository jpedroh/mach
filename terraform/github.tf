provider "github" {
  token = var.github_token
}

data "github_actions_public_key" "mach_repository" {
  repository = "mach"
}

resource "github_actions_secret" "aisweb_api_key" {
  repository      = "mach"
  secret_name     = "aisweb_api_key"
  plaintext_value = var.aisweb_api_key
}

resource "github_actions_secret" "aisweb_api_password" {
  repository      = "mach"
  secret_name     = "aisweb_api_password"
  plaintext_value = var.aisweb_api_password
}
