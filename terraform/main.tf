terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}
