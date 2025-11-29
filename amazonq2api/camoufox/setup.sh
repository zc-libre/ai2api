#!/bin/bash
# Camoufox 环境安装脚本

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"

echo "🦊 安装 Camoufox 环境..."

# 检查 Python 版本
if ! command -v python3 &> /dev/null; then
    echo "❌ 未找到 Python3，请先安装 Python 3.9+"
    exit 1
fi

PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "📌 Python 版本: $PYTHON_VERSION"

# 创建虚拟环境
if [ ! -d "$VENV_DIR" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv "$VENV_DIR"
fi

# 激活虚拟环境
source "$VENV_DIR/bin/activate"

# 升级 pip
pip install --upgrade pip

# 安装依赖
echo "📦 安装依赖..."
pip install -r "$SCRIPT_DIR/requirements.txt"

# 安装 Camoufox 浏览器
echo "🦊 下载 Camoufox 浏览器..."
python -c "from camoufox.sync_api import Camoufox; print('Camoufox 核心已就绪')"

# 下载并验证扩展（解决空目录问题）
echo "🧩 下载默认扩展 (uBlock Origin)..."
python -c "
import os
import shutil
from camoufox.addons import get_addon_path, maybe_download_addons, DefaultAddons

# 检查 UBO 扩展
addon_path = get_addon_path('UBO')
manifest_path = os.path.join(addon_path, 'manifest.json')

# 如果目录存在但 manifest.json 不存在，删除并重新下载
if os.path.exists(addon_path) and not os.path.exists(manifest_path):
    print(f'发现损坏的扩展目录，重新下载...')
    shutil.rmtree(addon_path)

# 下载扩展
addon_list = []
maybe_download_addons([DefaultAddons.UBO], addon_list)

# 验证
if os.path.exists(manifest_path):
    print('扩展下载验证成功 ✓')
else:
    print('警告: 扩展下载可能失败')
"

# 最终验证
echo "🔍 验证安装..."
python -c "
from camoufox.sync_api import Camoufox
with Camoufox(headless=True) as browser:
    page = browser.new_page()
    page.goto('about:blank')
print('Camoufox 验证通过 ✓')
"

echo ""
echo "✅ 安装完成！"
echo ""
echo "使用方法:"
echo "  source $VENV_DIR/bin/activate"
echo "  python login_handler.py --url <验证链接> --email <邮箱> --password <密码>"
echo ""
echo "或者直接运行:"
echo "  $VENV_DIR/bin/python $SCRIPT_DIR/login_handler.py --help"

