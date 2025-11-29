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
python -c "from camoufox.sync_api import Camoufox; print('Camoufox 已就绪')"

echo ""
echo "✅ 安装完成！"
echo ""
echo "使用方法:"
echo "  source $VENV_DIR/bin/activate"
echo "  python login_handler.py --url <验证链接> --email <邮箱> --password <密码>"
echo ""
echo "或者直接运行:"
echo "  $VENV_DIR/bin/python $SCRIPT_DIR/login_handler.py --help"

