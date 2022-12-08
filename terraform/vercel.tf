provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "mach" {
  name      = "mach"
  framework = "vite"
  git_repository = {
    production_branch = "master"
    repo              = "jpedroh/mach"
    type              = "github"
  }
  build_command    = "nx run @mach/front:build"
  output_directory = "packages/front/dist"
}

resource "vercel_project_domain" "domain" {
  project_id = vercel_project.mach.id
  domain     = "mach.jpedroh.dev"
}

data "github_release" "mach_latest" {
  repository  = "mach"
  owner       = "jpedroh"
  retrieve_by = "latest"
}

resource "vercel_project_environment_variable" "vite_app_version" {
  project_id = vercel_project.mach.id
  key        = "VITE_APP_VERSION"
  value      = data.github_release.mach_latest.release_tag
  target     = ["production"]
}
