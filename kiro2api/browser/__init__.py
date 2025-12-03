"""
浏览器自动化模块

提供 Camoufox 反检测浏览器集成。
直接调用 camoufox/login_handler.py，无需子进程。
"""

from .camoufox_bridge import (
    register_with_camoufox,
    login_with_camoufox,
    check_camoufox_installed,
    install_camoufox,
    ensure_camoufox_installed,
    CamoufoxResult,
    CamoufoxRegistrationOptions,
)

__all__ = [
    "register_with_camoufox",
    "login_with_camoufox",
    "check_camoufox_installed",
    "install_camoufox",
    "ensure_camoufox_installed",
    "CamoufoxResult",
    "CamoufoxRegistrationOptions",
]

