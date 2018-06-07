variable "product" {
  type = "string"
}

variable "component" {
  type = "string"
}

variable "team_name" {
  default = "judicial_ui"
}

variable "app_language" {
    default = "node"
}

variable "location" {
  type = "string"
  default = "UK South"
}

variable "env" {
  type = "string"
}

variable "subscription" {
  type = "string"
}

variable "ilbIp"{}

variable "tenant_id" {}

variable "jenkins_AAD_objectId" {
  type                        = "string"
  description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

////////////////////////////////////////////////
//Addtional Vars ///////////////////////////////
////////////////////////////////////////////////
variable "capacity" {
  default = "2"
}

////////////////////////////////////////////////
// Endpoints
////////////////////////////////////////////////
variable "vault_section" {
  default = "test"
}

variable "dm_store_app_url" {
  default = "dm-store"
}

variable "em_anno_app_url" {
  default = "em-anno"
}

variable "em_redact_app_url" {
  default = "em-redact"
}

variable "ccd_data_app_url" {
  default = "ccd-data-store-api"
}

variable "s2s_url" {
  default = "rpe-service-auth-provider"
}

variable "idam_api_url" {
  default = "idam-api-idam"
}

variable "idam_login_url" {
  default = "idam-web-public-idam"
}

////////////////////////////////////////////////
// Logging
////////////////////////////////////////////////
variable "root_appender" {
  default = "JSON_CONSOLE"
}

variable "json_console_pretty_print" {
  default = "false"
}

variable "log_output" {
  default = "single"
}

////////////////////////////////////////////////
// Toggle Features
////////////////////////////////////////////////

////////////////////////////////////////////////
// Addtional
////////////////////////////////////////////////
variable "s2s_service_name" {
  default = "jui_webapp"
}

variable "idam_client_id" {
  default = "juiwebapp"
}
