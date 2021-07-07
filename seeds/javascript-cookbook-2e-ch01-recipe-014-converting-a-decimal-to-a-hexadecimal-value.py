"""
You have a decimal value, and need to find its hexadecimal equivalent.
"""


def decimal_to_hexadecimal(decimal_value):
    hexadecimal_value = hex(decimal_value)[2:]
    return hexadecimal_value


print("Print test value for Converting a Decimal to a Hexadecimal Value")
print(decimal_to_hexadecimal(10))
print(decimal_to_hexadecimal(15))
print(decimal_to_hexadecimal(255))
print(decimal_to_hexadecimal(256))
print(decimal_to_hexadecimal(2560))
