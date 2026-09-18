variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "environment must be dev, staging, or production."
  }
}

variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
  default   = null
  nullable  = true
}

variable "cloudflare_account_id" {
  type     = string
  default  = null
  nullable = true
}
