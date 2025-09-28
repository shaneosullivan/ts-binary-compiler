CC = gcc
CFLAGS = -O2 -Wall -Wextra
LDFLAGS = -L/opt/homebrew/Cellar/quickjs/2025-09-13-2/lib/quickjs -lquickjs -lcurl

# Paths - adjust these based on your QuickJS installation
QUICKJS_PREFIX ?= /opt/homebrew
QUICKJS_INC = $(QUICKJS_PREFIX)/include
QUICKJS_LIB = $(QUICKJS_PREFIX)/Cellar/quickjs/2025-09-13-2/lib/quickjs

BUILD_DIR = ../build
OUTPUT_NAME ?= output
TARGET = $(BUILD_DIR)/$(OUTPUT_NAME)
TEMP_DIR ?= $(HOME)/.ts-binary-compiler
GENERATED_DIR = $(TEMP_DIR)/generated
SOURCES = fetch_full.c $(GENERATED_DIR)/test_bundle.c
JS_BUNDLE = $(TEMP_DIR)/bundle.js

.PHONY: all clean install-deps

all: $(BUILD_DIR) $(TARGET)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(GENERATED_DIR)/bundle.c: $(JS_BUNDLE)
	@mkdir -p $(GENERATED_DIR)
	@echo "Converting JS bundle to C array..."
	@echo "#include <stdint.h>" > $(GENERATED_DIR)/bundle.c
	@echo "const uint8_t qjsc_bundle[] = {" >> $(GENERATED_DIR)/bundle.c
	@xxd -i < $(JS_BUNDLE) | sed 's/unsigned char stdin_txt\[\]//' | sed 's/unsigned int stdin_txt_len/const uint32_t qjsc_bundle_size/' >> $(GENERATED_DIR)/bundle.c
	@echo "};" >> $(GENERATED_DIR)/bundle.c
	@sed -i.bak 's/stdin_txt/qjsc_bundle/g' $(GENERATED_DIR)/bundle.c && rm -f $(GENERATED_DIR)/bundle.c.bak

$(TARGET): $(SOURCES) | $(BUILD_DIR)
	$(CC) $(CFLAGS) -I$(QUICKJS_INC) -o $@ $^ -L$(QUICKJS_LIB) $(LDFLAGS)
	strip $@

install-deps:
	@echo "Installing dependencies..."
	@if command -v brew >/dev/null 2>&1; then \
		brew install quickjs curl; \
	elif command -v apt-get >/dev/null 2>&1; then \
		sudo apt-get update && sudo apt-get install -y libquickjs-dev libcurl4-openssl-dev; \
	elif command -v yum >/dev/null 2>&1; then \
		sudo yum install -y quickjs-devel libcurl-devel; \
	else \
		echo "Please install QuickJS and libcurl manually"; \
	fi


clean:
	rm -f $(TARGET)
	rm -rf $(BUILD_DIR)
	rm -rf $(TEMP_DIR)

help:
	@echo "Available targets:"
	@echo "  all         - Build the application"
	@echo "  install-deps - Install QuickJS and curl dependencies"
	@echo "  clean       - Remove built files"
	@echo "  help        - Show this help"