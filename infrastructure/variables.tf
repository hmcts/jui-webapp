variable "product" {
  type = "string"
  default = "jui"
  description = "The name of your application"
}

variable "app_name" {
  default = "webapp"
}

variable "app_type" {
  default = "web"
}

variable "capacity" {
  default = "2"
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
  description = "(Required) The environment in which to deploy the application infrastructure.",
  default = "saat"
}

variable "subscription" {
  type = "string"
}

variable "ilbIp"{

}

variable "tenant_id" {

}

variable "jenkins_AAD_objectId" {
  type                        = "string"
  description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
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