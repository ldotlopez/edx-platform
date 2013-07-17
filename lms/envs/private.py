
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DEFAULT_FROM_EMAIL = 'mooc@uji.es'
DEFAULT_FEEDBACK_EMAIL = 'mooc@uji.es'
SERVER_EMAIL = 'mooc@uji.es'
TECH_SUPPORT_EMAIL = 'mooc@uji.es'
CONTACT_EMAIL = 'mooc@uji.es'
BUGS_EMAIL = 'mooc@uji.es'
ADMINS = (
    ('edX Admins', 'lopezl@sg.uji.es'),
)

FAVICON_PATH = 'images/uji.ico'

# Locale/Internationalization
TIME_ZONE = 'Europe/Madrid'  # http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
FORCE_SCRIPT_NAME = ''


#UJI: from lms/envs/common.py modifications
SITE_NAME = "mooc.uji.es"
HTTPS = 'no'

