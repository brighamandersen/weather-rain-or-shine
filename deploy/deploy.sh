#!/bin/bash
set -euo pipefail

echo "Deploying weather"

# nginx

sudo ln -sf /home/brig/code/weather-rain-or-shine/deploy/nginx.conf /etc/nginx/conf.d/weather.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for weather"
