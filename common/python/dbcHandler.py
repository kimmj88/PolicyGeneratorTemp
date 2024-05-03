# import debugpy
import canmatrix
import sys
import jsonpickle
from decimal import Decimal

# debugpy.wait_for_client()
# debugpy.breakpoint()

class Handler(jsonpickle.handlers.BaseHandler):
    def restore(self, obj):
        pass

    def flatten(self, obj, data):
        return float(obj)

if __name__ == "__main__":
    path = sys.argv[1]
    if not path:
        sys.exit(None)

    value = canmatrix.formats.loadp(path)
    if value is None:
        sys.exit(None)

    jsonpickle.handlers.registry.register(Decimal, Handler)

    json_value = jsonpickle.encode(value[''])

    print(json_value)
    sys.exit(0)
