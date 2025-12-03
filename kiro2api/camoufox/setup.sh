#!/bin/bash
# Camoufox 浏览器安装脚本（简化版）
# 仅下载浏览器和扩展，依赖由主项目 requirements.txt 管理

set -e

echo "🦊 下载 Camoufox 浏览器..."

python3 -c "
from camoufox.sync_api import Camoufox
import os
import shutil
from camoufox.addons import get_addon_path, maybe_download_addons, DefaultAddons

# 检查并下载 UBO 扩展
addon_path = get_addon_path('UBO')
manifest_path = os.path.join(addon_path, 'manifest.json')

# 如果目录存在但损坏，删除重新下载
if os.path.exists(addon_path) and not os.path.exists(manifest_path):
    print('发现损坏的扩展目录，重新下载...')
    shutil.rmtree(addon_path)

# 下载扩展
addon_list = []
maybe_download_addons([DefaultAddons.UBO], addon_list)

# 验证安装
print('🔍 验证安装...')
with Camoufox(headless=True) as browser:
    page = browser.new_page()
    page.goto('about:blank')

print('✅ Camoufox 安装完成')
"
