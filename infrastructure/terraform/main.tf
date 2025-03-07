# Configuration

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

# Create a new Web Droplet in the nyc2 region
resource "digitalocean_droplet" "jenkins" {
  image    = "ubuntu-20-04-x64"
  name     = "jenkins"
  region   = var.region
  size     = "s-2vcpu-2gb"
  ssh_keys = [data.digitalocean_ssh_key.ssh_key.fingerprint]
}

resource "digitalocean_kubernetes_cluster" "k8s" {
  name    = "spool-cluster"
  region  = var.region
  version = "1.32.2-do.0"

  node_pool {
    name       = "default"
    size       = "s-2vcpu-2gb"
    node_count = 2
  }
}

# Data

data "digitalocean_ssh_key" "ssh_key" {
  name = "spool"
}

#variables

variable "do_token" { # lembrar de criar um arquivo tfvars e colocar o token
  type    = string
  default = ""
}

variable "region" {
  type    = string
  default = "nyc2"
}

# Outputs

output "jenkins_ip" {
  value = digitalocean_droplet.jenkins.ipv4_address
}

resource "local_file" "k8s_config" {
  content  = digitalocean_kubernetes_cluster.k8s.kube_config[0].raw_config
  filename = "./config"
}