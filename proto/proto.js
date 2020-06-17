/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/minimal'

const $Reader = $protobuf.Reader; const $Writer = $protobuf.Writer; const $util = $protobuf.util

const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const github = $root.github = (() => {
  const github = {}

  github.com = (function() {
    const com = {}

    com.nevercase = (function() {
      const nevercase = {}

      nevercase.k8s_controller_custom_resource = (function() {
        const k8s_controller_custom_resource = {}

        k8s_controller_custom_resource.api = (function() {
          const api = {}

          api.proto = (function() {
            const proto = {}

            proto.MysqlCrd = (function() {
              function MysqlCrd(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              MysqlCrd.prototype.Name = ''
              MysqlCrd.prototype.master = null
              MysqlCrd.prototype.slave = null

              MysqlCrd.create = function create(properties) {
                return new MysqlCrd(properties)
              }

              MysqlCrd.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.Name != null && Object.hasOwnProperty.call(message, 'Name')) { writer.uint32(10).string(message.Name) }
                if (message.master != null && Object.hasOwnProperty.call(message, 'master')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.encode(message.master, writer.uint32(18).fork()).ldelim() }
                if (message.slave != null && Object.hasOwnProperty.call(message, 'slave')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.encode(message.slave, writer.uint32(26).fork()).ldelim() }
                return writer
              }

              MysqlCrd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              MysqlCrd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.Name = reader.string()
                      break
                    case 2:
                      message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.decode(reader, reader.uint32())
                      break
                    case 3:
                      message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              MysqlCrd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              MysqlCrd.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.Name != null && message.hasOwnProperty('Name')) {
                  if (!$util.isString(message.Name)) { return 'Name: string expected' }
                }
                if (message.master != null && message.hasOwnProperty('master')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify(message.master)
                  if (error) { return 'master.' + error }
                }
                if (message.slave != null && message.hasOwnProperty('slave')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify(message.slave)
                  if (error) { return 'slave.' + error }
                }
                return null
              }

              MysqlCrd.fromObject = function fromObject(object) {
                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd) { return object }
                const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd()
                if (object.Name != null) { message.Name = String(object.Name) }
                if (object.master != null) {
                  if (typeof object.master !== 'object') { throw TypeError('.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.master: object expected') }
                  message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.fromObject(object.master)
                }
                if (object.slave != null) {
                  if (typeof object.slave !== 'object') { throw TypeError('.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.slave: object expected') }
                  message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.fromObject(object.slave)
                }
                return message
              }

              MysqlCrd.toObject = function toObject(message, options) {
                if (!options) { options = {} }
                const object = {}
                if (options.defaults) {
                  object.Name = ''
                  object.master = null
                  object.slave = null
                }
                if (message.Name != null && message.hasOwnProperty('Name')) { object.Name = message.Name }
                if (message.master != null && message.hasOwnProperty('master')) { object.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.toObject(message.master, options) }
                if (message.slave != null && message.hasOwnProperty('slave')) { object.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.toObject(message.slave, options) }
                return object
              }

              MysqlCrd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
              }

              return MysqlCrd
            })()

            proto.MysqlSpec = (function() {
              function MysqlSpec(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              MysqlSpec.prototype.Name = ''
              MysqlSpec.prototype.replicas = 0
              MysqlSpec.prototype.image = ''
              MysqlSpec.prototype.imagePullSecrets = ''

              MysqlSpec.create = function create(properties) {
                return new MysqlSpec(properties)
              }

              MysqlSpec.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.Name != null && Object.hasOwnProperty.call(message, 'Name')) { writer.uint32(10).string(message.Name) }
                if (message.replicas != null && Object.hasOwnProperty.call(message, 'replicas')) { writer.uint32(16).int32(message.replicas) }
                if (message.image != null && Object.hasOwnProperty.call(message, 'image')) { writer.uint32(26).string(message.image) }
                if (message.imagePullSecrets != null && Object.hasOwnProperty.call(message, 'imagePullSecrets')) { writer.uint32(34).string(message.imagePullSecrets) }
                return writer
              }

              MysqlSpec.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              MysqlSpec.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.Name = reader.string()
                      break
                    case 2:
                      message.replicas = reader.int32()
                      break
                    case 3:
                      message.image = reader.string()
                      break
                    case 4:
                      message.imagePullSecrets = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              MysqlSpec.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              MysqlSpec.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.Name != null && message.hasOwnProperty('Name')) {
                  if (!$util.isString(message.Name)) { return 'Name: string expected' }
                }
                if (message.replicas != null && message.hasOwnProperty('replicas')) {
                  if (!$util.isInteger(message.replicas)) { return 'replicas: integer expected' }
                }
                if (message.image != null && message.hasOwnProperty('image')) {
                  if (!$util.isString(message.image)) { return 'image: string expected' }
                }
                if (message.imagePullSecrets != null && message.hasOwnProperty('imagePullSecrets')) {
                  if (!$util.isString(message.imagePullSecrets)) { return 'imagePullSecrets: string expected' }
                }
                return null
              }

              MysqlSpec.fromObject = function fromObject(object) {
                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec) { return object }
                const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec()
                if (object.Name != null) { message.Name = String(object.Name) }
                if (object.replicas != null) { message.replicas = object.replicas | 0 }
                if (object.image != null) { message.image = String(object.image) }
                if (object.imagePullSecrets != null) { message.imagePullSecrets = String(object.imagePullSecrets) }
                return message
              }

              MysqlSpec.toObject = function toObject(message, options) {
                if (!options) { options = {} }
                const object = {}
                if (options.defaults) {
                  object.Name = ''
                  object.replicas = 0
                  object.image = ''
                  object.imagePullSecrets = ''
                }
                if (message.Name != null && message.hasOwnProperty('Name')) { object.Name = message.Name }
                if (message.replicas != null && message.hasOwnProperty('replicas')) { object.replicas = message.replicas }
                if (message.image != null && message.hasOwnProperty('image')) { object.image = message.image }
                if (message.imagePullSecrets != null && message.hasOwnProperty('imagePullSecrets')) { object.imagePullSecrets = message.imagePullSecrets }
                return object
              }

              MysqlSpec.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
              }

              return MysqlSpec
            })()

            proto.Request = (function() {
              function Request(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Request.prototype.service = ''
              Request.prototype.data = ''

              Request.create = function create(properties) {
                return new Request(properties)
              }

              Request.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.service != null && Object.hasOwnProperty.call(message, 'service')) { writer.uint32(10).string(message.service) }
                if (message.data != null && Object.hasOwnProperty.call(message, 'data')) { writer.uint32(18).string(message.data) }
                return writer
              }

              Request.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Request.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.service = reader.string()
                      break
                    case 2:
                      message.data = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Request.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Request.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.service != null && message.hasOwnProperty('service')) {
                  if (!$util.isString(message.service)) { return 'service: string expected' }
                }
                if (message.data != null && message.hasOwnProperty('data')) {
                  if (!$util.isString(message.data)) { return 'data: string expected' }
                }
                return null
              }

              Request.fromObject = function fromObject(object) {
                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request) { return object }
                const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request()
                if (object.service != null) { message.service = String(object.service) }
                if (object.data != null) { message.data = String(object.data) }
                return message
              }

              Request.toObject = function toObject(message, options) {
                if (!options) { options = {} }
                const object = {}
                if (options.defaults) {
                  object.service = ''
                  object.data = ''
                }
                if (message.service != null && message.hasOwnProperty('service')) { object.service = message.service }
                if (message.data != null && message.hasOwnProperty('data')) { object.data = message.data }
                return object
              }

              Request.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
              }

              return Request
            })()

            proto.Response = (function() {
              function Response(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Response.prototype.code = 0
              Response.prototype.result = ''

              Response.create = function create(properties) {
                return new Response(properties)
              }

              Response.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.code != null && Object.hasOwnProperty.call(message, 'code')) { writer.uint32(8).int32(message.code) }
                if (message.result != null && Object.hasOwnProperty.call(message, 'result')) { writer.uint32(18).string(message.result) }
                return writer
              }

              Response.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Response.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.code = reader.int32()
                      break
                    case 2:
                      message.result = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Response.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Response.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.code != null && message.hasOwnProperty('code')) {
                  if (!$util.isInteger(message.code)) { return 'code: integer expected' }
                }
                if (message.result != null && message.hasOwnProperty('result')) {
                  if (!$util.isString(message.result)) { return 'result: string expected' }
                }
                return null
              }

              Response.fromObject = function fromObject(object) {
                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response) { return object }
                const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response()
                if (object.code != null) { message.code = object.code | 0 }
                if (object.result != null) { message.result = String(object.result) }
                return message
              }

              Response.toObject = function toObject(message, options) {
                if (!options) { options = {} }
                const object = {}
                if (options.defaults) {
                  object.code = 0
                  object.result = ''
                }
                if (message.code != null && message.hasOwnProperty('code')) { object.code = message.code }
                if (message.result != null && message.hasOwnProperty('result')) { object.result = message.result }
                return object
              }

              Response.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
              }

              return Response
            })()

            return proto
          })()

          return api
        })()

        return k8s_controller_custom_resource
      })()

      return nevercase
    })()

    return com
  })()

  return github
})()

export { $root as default }
