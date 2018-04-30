locals {
  app_full_name = "${var.product}-${var.component}"
  ase_name = "${data.terraform_remote_state.core_apps_compute.ase_name[0]}"
  local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"
}
# "${local.ase_name}"
# "${local.app_full_name}"
# "${local.local_env}"

module "app" {
  source = "git@github.com:hmcts/moj-module-webapp?ref=master"
  product = "${local.app_full_name}"
  location = "${var.location}"
  env = "${var.env}"
  ilbIp = "${var.ilbIp}"
  subscription = "${var.subscription}"
  capacity     = "${var.capacity}"
  is_frontend = true
  additional_host_name = "${local.app_full_name}-${var.env}.service.${var.env}.platform.hmcts.net"
  https_only="false"

  app_settings = {
    # REDIS_HOST = "${module.redis-cache.host_name}"
    # REDIS_PORT = "${module.redis-cache.redis_port}"
    # REDIS_PASSWORD = "${module.redis-cache.access_key}"
    # RECIPE_BACKEND_URL = "http://rhubarb-recipe-backend-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
    WEBSITE_NODE_DEFAULT_VERSION = "8.8.0"

    # NODE_ENV = "${var.env}"
    # PORT = "8080"

    # logging vars & healthcheck
    REFORM_SERVICE_NAME = "${local.app_full_name}"
    REFORM_TEAM = "${var.team_name}"
    REFORM_SERVICE_TYPE = "${var.app_language}"
    REFORM_ENVIRONMENT = "${var.env}"

    PACKAGES_NAME = "${local.app_full_name}"
    PACKAGES_PROJECT = "${var.team_name}"
    PACKAGES_ENVIRONMENT = "${var.env}"

    ROOT_APPENDER = "${var.root_appender}"
    JSON_CONSOLE_PRETTY_PRINT = "${var.json_console_pretty_print}"
    LOG_OUTPUT = "${var.log_output}"

    DM_STORE_APP_URI= "http://${var.dm_store_app_url}-${local.local_env}.service.core-compute-${local.local_env}.internal"
    EM_ANNO_APP_URI="http://${var.em_anno_app_url}-${local.local_env}.service.core-compute-${local.local_env}.internal"
    EM_REDACT_APP_URI="http://${var.em_redact_app_url}-${local.local_env}.service.core-compute-${local.local_env}.internal"

    DM_UPLOAD_URL="/demproxy/dm/documents"
    DM_OWNED_URL="/demproxy/dm/documents/owned"
    DM_SEARCH_URL="/demproxy/dm/documents/filter"

    IDAM_LOGIN_URL = "${var.idam_login_url}"
    IDAM_USER_BASE_URI = "${var.idam_api_url}"
    IDAM_S2S_BASE_URI = "http://${var.s2s_url}-${local.local_env}.service.core-compute-${local.local_env}.internal"
    IDAM_SERVICE_KEY = "${data.vault_generic_secret.s2s_secret.data["value"]}"
    IDAM_SERVICE_NAME = "${var.idam_service_name}"
    IDAM_API_OAUTH2_CLIENT_CLIENT_SECRETS_WEBSHOW = "${data.vault_generic_secret.oauth2_secret.data["value"]}"
  }
}

provider "vault" {
  address = "https://vault.reform.hmcts.net:6200"
}

data "vault_generic_secret" "s2s_secret" {
  path = "secret/${var.vault_section}/ccidam/service-auth-provider/api/microservice-keys/em-gw"
}

data "vault_generic_secret" "oauth2_secret" {
  path = "secret/${var.vault_section}/ccidam/idam-api/oauth2/client-secrets/webshow"
}

module "key_vault" {
  source = "git@github.com:hmcts/moj-module-key-vault?ref=master"
  product = "${local.app_full_name}"
  env = "${var.env}"
  tenant_id = "${var.tenant_id}"
  object_id = "${var.jenkins_AAD_objectId}"
  resource_group_name = "${module.app.resource_group_name}"
  product_group_object_id = "5d9cd025-a293-4b97-a0e5-6f43efce02c0"
}

resource "azurerm_key_vault_secret" "S2S_TOKEN" {
  name = "s2s-token"
  value = "${data.vault_generic_secret.s2s_secret.data["value"]}"
  vault_uri = "${module.key_vault.key_vault_uri}"
}

resource "azurerm_key_vault_secret" "OAUTH2_TOKEN" {
  name = "oauth2-token"
  value = "${data.vault_generic_secret.s2s_secret.data["value"]}"
  vault_uri = "${module.key_vault.key_vault_uri}"
}

# module "redis-cache" {
# source = "git@github.com:hmcts/moj-module-redis?ref=master"
# product = "${var.product}"
# location = "${var.location}"
# env = "${var.env}"
# subnetid = "${data.terraform_remote_state.core_apps_infrastructure.subnet_ids[2]}"
# }
