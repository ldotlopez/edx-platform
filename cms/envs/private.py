# pylint: disable=W0401, W0614

from .common import ENV_ROOT, MITX_FEATURES
from logsettings import get_logger_config

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'mooc@uji.es'
DEFAULT_FEEDBACK_EMAIL = 'mooc@uji.es'
SERVER_EMAIL = 'mooc@uji.es'
ADMINS = (
    ('edX Admins', 'lopezl@sg.uji.es'),
)
TIME_ZONE = 'Europe/Madrid'  # http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
FORCE_SCRIPT_NAME = ''
HTTPS='no'
LOGGING = get_logger_config(ENV_ROOT / "log",
                            logging_env="uji",
                            tracking_filename="tracking.log",
                            dev_env=False,
                            debug=True)
 
LMS_BASE = "mooc.uji.es"
MITX_FEATURES['PREVIEW_LMS_BASE'] = "mooc.uji.es"

