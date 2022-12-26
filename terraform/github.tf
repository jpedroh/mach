provider "github" {
  token = var.github_token
}

data "github_actions_public_key" "mach_repository" {
  repository = "mach"
}

resource "github_actions_secret" "aisweb_api_key" {
  repository      = "mach"
  secret_name     = "AISWEB_API_KEY"
  plaintext_value = var.aisweb_api_key
}

resource "github_actions_secret" "aisweb_api_password" {
  repository      = "mach"
  secret_name     = "AISWEB_API_PASSWORD"
  plaintext_value = var.aisweb_api_password
}


resource "github_actions_secret" "database_url" {
  repository      = "mach"
  secret_name     = "DATABASE_URL"
  plaintext_value = var.database_url
}
