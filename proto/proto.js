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

            proto.ConfigMap = (function() {
              function ConfigMap(properties) {
                this.data = {}
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ConfigMap.prototype.Name = ''
              ConfigMap.prototype.resourceVersion = ''
              ConfigMap.prototype.data = $util.emptyObject

              ConfigMap.create = function create(properties) {
                return new ConfigMap(properties)
              }

              ConfigMap.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.Name != null && Object.hasOwnProperty.call(message, 'Name')) { writer.uint32(10).string(message.Name) }
                if (message.resourceVersion != null && Object.hasOwnProperty.call(message, 'resourceVersion')) { writer.uint32(18).string(message.resourceVersion) }
                if (message.data != null && Object.hasOwnProperty.call(message, 'data')) {
                  for (let keys = Object.keys(message.data), i = 0; i < keys.length; ++i) { writer.uint32(26).fork().uint32(10).string(keys[i]).uint32(18).string(message.data[keys[i]]).ldelim() }
                }
                return writer
              }

              ConfigMap.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ConfigMap.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap(); let key
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.Name = reader.string()
                      break
                    case 2:
                      message.resourceVersion = reader.string()
                      break
                    case 3:
                      reader.skip().pos++
                      if (message.data === $util.emptyObject) { message.data = {} }
                      key = reader.string()
                      reader.pos++
                      message.data[key] = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ConfigMap.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ConfigMap.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.Name != null && message.hasOwnProperty('Name')) {
                  if (!$util.isString(message.Name)) { return 'Name: string expected' }
                }
                if (message.resourceVersion != null && message.hasOwnProperty('resourceVersion')) {
                  if (!$util.isString(message.resourceVersion)) { return 'resourceVersion: string expected' }
                }
                if (message.data != null && message.hasOwnProperty('data')) {
                  if (!$util.isObject(message.data)) { return 'data: object expected' }
                  const key = Object.keys(message.data)
                  for (let i = 0; i < key.length; ++i) {
                    if (!$util.isString(message.data[key[i]])) { return 'data: string{k:string} expected' }
                  }
                }
                return null
              }

              return ConfigMap
            })()

            proto.ConfigMapList = (function() {
              function ConfigMapList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ConfigMapList.prototype.items = $util.emptyArray

              ConfigMapList.create = function create(properties) {
                return new ConfigMapList(properties)
              }

              ConfigMapList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              ConfigMapList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ConfigMapList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ConfigMapList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ConfigMapList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return ConfigMapList
            })()

            proto.ConfigMapVolumeSource = (function() {
              function ConfigMapVolumeSource(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ConfigMapVolumeSource.prototype.items = $util.emptyArray
              ConfigMapVolumeSource.prototype.defaultMode = 0
              ConfigMapVolumeSource.prototype.optional = false

              ConfigMapVolumeSource.create = function create(properties) {
                return new ConfigMapVolumeSource(properties)
              }

              ConfigMapVolumeSource.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.KeyToPath.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                if (message.defaultMode != null && Object.hasOwnProperty.call(message, 'defaultMode')) { writer.uint32(16).int32(message.defaultMode) }
                if (message.optional != null && Object.hasOwnProperty.call(message, 'optional')) { writer.uint32(24).bool(message.optional) }
                return writer
              }

              ConfigMapVolumeSource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ConfigMapVolumeSource.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapVolumeSource()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.KeyToPath.decode(reader, reader.uint32()))
                      break
                    case 2:
                      message.defaultMode = reader.int32()
                      break
                    case 3:
                      message.optional = reader.bool()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ConfigMapVolumeSource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ConfigMapVolumeSource.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.KeyToPath.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                if (message.defaultMode != null && message.hasOwnProperty('defaultMode')) {
                  if (!$util.isInteger(message.defaultMode)) { return 'defaultMode: integer expected' }
                }
                if (message.optional != null && message.hasOwnProperty('optional')) {
                  if (typeof message.optional !== 'boolean') { return 'optional: boolean expected' }
                }
                return null
              }

              return ConfigMapVolumeSource
            })()

            proto.ContainerPort = (function() {
              function ContainerPort(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ContainerPort.prototype.name = ''
              ContainerPort.prototype.hostPort = 0
              ContainerPort.prototype.containerPort = 0
              ContainerPort.prototype.protocol = ''
              ContainerPort.prototype.hostIP = ''

              ContainerPort.create = function create(properties) {
                return new ContainerPort(properties)
              }

              ContainerPort.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.hostPort != null && Object.hasOwnProperty.call(message, 'hostPort')) { writer.uint32(16).int32(message.hostPort) }
                if (message.containerPort != null && Object.hasOwnProperty.call(message, 'containerPort')) { writer.uint32(24).int32(message.containerPort) }
                if (message.protocol != null && Object.hasOwnProperty.call(message, 'protocol')) { writer.uint32(34).string(message.protocol) }
                if (message.hostIP != null && Object.hasOwnProperty.call(message, 'hostIP')) { writer.uint32(42).string(message.hostIP) }
                return writer
              }

              ContainerPort.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ContainerPort.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ContainerPort()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.hostPort = reader.int32()
                      break
                    case 3:
                      message.containerPort = reader.int32()
                      break
                    case 4:
                      message.protocol = reader.string()
                      break
                    case 5:
                      message.hostIP = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ContainerPort.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ContainerPort.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.hostPort != null && message.hasOwnProperty('hostPort')) {
                  if (!$util.isInteger(message.hostPort)) { return 'hostPort: integer expected' }
                }
                if (message.containerPort != null && message.hasOwnProperty('containerPort')) {
                  if (!$util.isInteger(message.containerPort)) { return 'containerPort: integer expected' }
                }
                if (message.protocol != null && message.hasOwnProperty('protocol')) {
                  if (!$util.isString(message.protocol)) { return 'protocol: string expected' }
                }
                if (message.hostIP != null && message.hasOwnProperty('hostIP')) {
                  if (!$util.isString(message.hostIP)) { return 'hostIP: string expected' }
                }
                return null
              }

              return ContainerPort
            })()

            proto.EnvVar = (function() {
              function EnvVar(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              EnvVar.prototype.name = ''
              EnvVar.prototype.value = ''

              EnvVar.create = function create(properties) {
                return new EnvVar(properties)
              }

              EnvVar.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.value != null && Object.hasOwnProperty.call(message, 'value')) { writer.uint32(18).string(message.value) }
                return writer
              }

              EnvVar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              EnvVar.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.EnvVar()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.value = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              EnvVar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              EnvVar.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.value != null && message.hasOwnProperty('value')) {
                  if (!$util.isString(message.value)) { return 'value: string expected' }
                }
                return null
              }

              return EnvVar
            })()

            proto.HarborHub = (function() {
              function HarborHub(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborHub.prototype.name = ''

              HarborHub.create = function create(properties) {
                return new HarborHub(properties)
              }

              HarborHub.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                return writer
              }

              HarborHub.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborHub.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHub()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborHub.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborHub.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                return null
              }

              return HarborHub
            })()

            proto.HarborHubList = (function() {
              function HarborHubList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborHubList.prototype.items = $util.emptyArray

              HarborHubList.create = function create(properties) {
                return new HarborHubList(properties)
              }

              HarborHubList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHub.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              HarborHubList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborHubList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHubList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHub.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborHubList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborHubList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHub.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return HarborHubList
            })()

            proto.HarborProject = (function() {
              function HarborProject(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborProject.prototype.projectId = 0
              HarborProject.prototype.name = ''

              HarborProject.create = function create(properties) {
                return new HarborProject(properties)
              }

              HarborProject.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.projectId != null && Object.hasOwnProperty.call(message, 'projectId')) { writer.uint32(8).int32(message.projectId) }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(18).string(message.name) }
                return writer
              }

              HarborProject.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborProject.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProject()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.projectId = reader.int32()
                      break
                    case 2:
                      message.name = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborProject.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborProject.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.projectId != null && message.hasOwnProperty('projectId')) {
                  if (!$util.isInteger(message.projectId)) { return 'projectId: integer expected' }
                }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                return null
              }

              return HarborProject
            })()

            proto.HarborProjectList = (function() {
              function HarborProjectList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborProjectList.prototype.items = $util.emptyArray

              HarborProjectList.create = function create(properties) {
                return new HarborProjectList(properties)
              }

              HarborProjectList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProject.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              HarborProjectList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborProjectList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProject.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborProjectList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborProjectList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProject.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return HarborProjectList
            })()

            proto.HarborRepository = (function() {
              function HarborRepository(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborRepository.prototype.repositoryId = 0
              HarborRepository.prototype.name = ''
              HarborRepository.prototype.projectId = 0

              HarborRepository.create = function create(properties) {
                return new HarborRepository(properties)
              }

              HarborRepository.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.repositoryId != null && Object.hasOwnProperty.call(message, 'repositoryId')) { writer.uint32(8).int32(message.repositoryId) }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(18).string(message.name) }
                if (message.projectId != null && Object.hasOwnProperty.call(message, 'projectId')) { writer.uint32(24).int32(message.projectId) }
                return writer
              }

              HarborRepository.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborRepository.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepository()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.repositoryId = reader.int32()
                      break
                    case 2:
                      message.name = reader.string()
                      break
                    case 3:
                      message.projectId = reader.int32()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborRepository.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborRepository.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.repositoryId != null && message.hasOwnProperty('repositoryId')) {
                  if (!$util.isInteger(message.repositoryId)) { return 'repositoryId: integer expected' }
                }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.projectId != null && message.hasOwnProperty('projectId')) {
                  if (!$util.isInteger(message.projectId)) { return 'projectId: integer expected' }
                }
                return null
              }

              return HarborRepository
            })()

            proto.HarborRepositoryList = (function() {
              function HarborRepositoryList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborRepositoryList.prototype.items = $util.emptyArray

              HarborRepositoryList.create = function create(properties) {
                return new HarborRepositoryList(properties)
              }

              HarborRepositoryList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepository.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              HarborRepositoryList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborRepositoryList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepositoryList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepository.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborRepositoryList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborRepositoryList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepository.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return HarborRepositoryList
            })()

            proto.HarborRequest = (function() {
              function HarborRequest(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborRequest.prototype.harborUrl = ''
              HarborRequest.prototype.command = ''
              HarborRequest.prototype.projectId = 0
              HarborRequest.prototype.imageName = ''

              HarborRequest.create = function create(properties) {
                return new HarborRequest(properties)
              }

              HarborRequest.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.harborUrl != null && Object.hasOwnProperty.call(message, 'harborUrl')) { writer.uint32(10).string(message.harborUrl) }
                if (message.command != null && Object.hasOwnProperty.call(message, 'command')) { writer.uint32(18).string(message.command) }
                if (message.projectId != null && Object.hasOwnProperty.call(message, 'projectId')) { writer.uint32(24).int32(message.projectId) }
                if (message.imageName != null && Object.hasOwnProperty.call(message, 'imageName')) { writer.uint32(34).string(message.imageName) }
                return writer
              }

              HarborRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRequest()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.harborUrl = reader.string()
                      break
                    case 2:
                      message.command = reader.string()
                      break
                    case 3:
                      message.projectId = reader.int32()
                      break
                    case 4:
                      message.imageName = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborRequest.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.harborUrl != null && message.hasOwnProperty('harborUrl')) {
                  if (!$util.isString(message.harborUrl)) { return 'harborUrl: string expected' }
                }
                if (message.command != null && message.hasOwnProperty('command')) {
                  if (!$util.isString(message.command)) { return 'command: string expected' }
                }
                if (message.projectId != null && message.hasOwnProperty('projectId')) {
                  if (!$util.isInteger(message.projectId)) { return 'projectId: integer expected' }
                }
                if (message.imageName != null && message.hasOwnProperty('imageName')) {
                  if (!$util.isString(message.imageName)) { return 'imageName: string expected' }
                }
                return null
              }

              return HarborRequest
            })()

            proto.HarborTag = (function() {
              function HarborTag(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborTag.prototype.digest = ''
              HarborTag.prototype.name = ''

              HarborTag.create = function create(properties) {
                return new HarborTag(properties)
              }

              HarborTag.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.digest != null && Object.hasOwnProperty.call(message, 'digest')) { writer.uint32(10).string(message.digest) }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(18).string(message.name) }
                return writer
              }

              HarborTag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborTag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTag()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.digest = reader.string()
                      break
                    case 2:
                      message.name = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborTag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborTag.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.digest != null && message.hasOwnProperty('digest')) {
                  if (!$util.isString(message.digest)) { return 'digest: string expected' }
                }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                return null
              }

              return HarborTag
            })()

            proto.HarborTagList = (function() {
              function HarborTagList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HarborTagList.prototype.items = $util.emptyArray

              HarborTagList.create = function create(properties) {
                return new HarborTagList(properties)
              }

              HarborTagList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTag.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              HarborTagList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HarborTagList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTagList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTag.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HarborTagList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HarborTagList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTag.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return HarborTagList
            })()

            proto.HelixSagaApp = (function() {
              function HelixSagaApp(properties) {
                this.command = []
                this.args = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HelixSagaApp.prototype.spec = null
              HelixSagaApp.prototype.command = $util.emptyArray
              HelixSagaApp.prototype.args = $util.emptyArray

              HelixSagaApp.create = function create(properties) {
                return new HelixSagaApp(properties)
              }

              HelixSagaApp.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.spec != null && Object.hasOwnProperty.call(message, 'spec')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.spec, writer.uint32(10).fork()).ldelim() }
                if (message.command != null && message.command.length) {
                  for (let i = 0; i < message.command.length; ++i) { writer.uint32(18).string(message.command[i]) }
                }
                if (message.args != null && message.args.length) {
                  for (let i = 0; i < message.args.length; ++i) { writer.uint32(26).string(message.args[i]) }
                }
                return writer
              }

              HelixSagaApp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HelixSagaApp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaApp()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.spec = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32())
                      break
                    case 2:
                      if (!(message.command && message.command.length)) { message.command = [] }
                      message.command.push(reader.string())
                      break
                    case 3:
                      if (!(message.args && message.args.length)) { message.args = [] }
                      message.args.push(reader.string())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HelixSagaApp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HelixSagaApp.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.spec != null && message.hasOwnProperty('spec')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.spec)
                  if (error) { return 'spec.' + error }
                }
                if (message.command != null && message.hasOwnProperty('command')) {
                  if (!Array.isArray(message.command)) { return 'command: array expected' }
                  for (let i = 0; i < message.command.length; ++i) {
                    if (!$util.isString(message.command[i])) { return 'command: string[] expected' }
                  }
                }
                if (message.args != null && message.hasOwnProperty('args')) {
                  if (!Array.isArray(message.args)) { return 'args: array expected' }
                  for (let i = 0; i < message.args.length; ++i) {
                    if (!$util.isString(message.args[i])) { return 'args: string[] expected' }
                  }
                }
                return null
              }

              return HelixSagaApp
            })()

            proto.HelixSagaConfigMapVolume = (function() {
              function HelixSagaConfigMapVolume(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HelixSagaConfigMapVolume.prototype.volume = null
              HelixSagaConfigMapVolume.prototype.volumeMount = null

              HelixSagaConfigMapVolume.create = function create(properties) {
                return new HelixSagaConfigMapVolume(properties)
              }

              HelixSagaConfigMapVolume.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.volume != null && Object.hasOwnProperty.call(message, 'volume')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Volume.encode(message.volume, writer.uint32(10).fork()).ldelim() }
                if (message.volumeMount != null && Object.hasOwnProperty.call(message, 'volumeMount')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeMount.encode(message.volumeMount, writer.uint32(18).fork()).ldelim() }
                return writer
              }

              HelixSagaConfigMapVolume.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HelixSagaConfigMapVolume.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaConfigMapVolume()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.volume = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Volume.decode(reader, reader.uint32())
                      break
                    case 2:
                      message.volumeMount = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeMount.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HelixSagaConfigMapVolume.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HelixSagaConfigMapVolume.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.volume != null && message.hasOwnProperty('volume')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Volume.verify(message.volume)
                  if (error) { return 'volume.' + error }
                }
                if (message.volumeMount != null && message.hasOwnProperty('volumeMount')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeMount.verify(message.volumeMount)
                  if (error) { return 'volumeMount.' + error }
                }
                return null
              }

              return HelixSagaConfigMapVolume
            })()

            proto.HelixSagaCrd = (function() {
              function HelixSagaCrd(properties) {
                this.applications = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HelixSagaCrd.prototype.name = ''
              HelixSagaCrd.prototype.resourceVersion = ''
              HelixSagaCrd.prototype.configMap = null
              HelixSagaCrd.prototype.applications = $util.emptyArray

              HelixSagaCrd.create = function create(properties) {
                return new HelixSagaCrd(properties)
              }

              HelixSagaCrd.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.resourceVersion != null && Object.hasOwnProperty.call(message, 'resourceVersion')) { writer.uint32(18).string(message.resourceVersion) }
                if (message.configMap != null && Object.hasOwnProperty.call(message, 'configMap')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaConfigMapVolume.encode(message.configMap, writer.uint32(26).fork()).ldelim() }
                if (message.applications != null && message.applications.length) {
                  for (let i = 0; i < message.applications.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaApp.encode(message.applications[i], writer.uint32(34).fork()).ldelim() }
                }
                return writer
              }

              HelixSagaCrd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HelixSagaCrd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.resourceVersion = reader.string()
                      break
                    case 3:
                      message.configMap = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaConfigMapVolume.decode(reader, reader.uint32())
                      break
                    case 4:
                      if (!(message.applications && message.applications.length)) { message.applications = [] }
                      message.applications.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaApp.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HelixSagaCrd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HelixSagaCrd.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.resourceVersion != null && message.hasOwnProperty('resourceVersion')) {
                  if (!$util.isString(message.resourceVersion)) { return 'resourceVersion: string expected' }
                }
                if (message.configMap != null && message.hasOwnProperty('configMap')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaConfigMapVolume.verify(message.configMap)
                  if (error) { return 'configMap.' + error }
                }
                if (message.applications != null && message.hasOwnProperty('applications')) {
                  if (!Array.isArray(message.applications)) { return 'applications: array expected' }
                  for (let i = 0; i < message.applications.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaApp.verify(message.applications[i])
                    if (error) { return 'applications.' + error }
                  }
                }
                return null
              }

              return HelixSagaCrd
            })()

            proto.HelixSagaCrdList = (function() {
              function HelixSagaCrdList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              HelixSagaCrdList.prototype.items = $util.emptyArray

              HelixSagaCrdList.create = function create(properties) {
                return new HelixSagaCrdList(properties)
              }

              HelixSagaCrdList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              HelixSagaCrdList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              HelixSagaCrdList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrdList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              HelixSagaCrdList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              HelixSagaCrdList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return HelixSagaCrdList
            })()

            proto.IntOrString = (function() {
              function IntOrString(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              IntOrString.prototype.type = 0
              IntOrString.prototype.intVal = 0
              IntOrString.prototype.strVal = ''

              IntOrString.create = function create(properties) {
                return new IntOrString(properties)
              }

              IntOrString.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.type != null && Object.hasOwnProperty.call(message, 'type')) { writer.uint32(8).int32(message.type) }
                if (message.intVal != null && Object.hasOwnProperty.call(message, 'intVal')) { writer.uint32(16).int32(message.intVal) }
                if (message.strVal != null && Object.hasOwnProperty.call(message, 'strVal')) { writer.uint32(26).string(message.strVal) }
                return writer
              }

              IntOrString.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              IntOrString.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.type = reader.int32()
                      break
                    case 2:
                      message.intVal = reader.int32()
                      break
                    case 3:
                      message.strVal = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              IntOrString.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              IntOrString.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.type != null && message.hasOwnProperty('type')) {
                  if (!$util.isInteger(message.type)) { return 'type: integer expected' }
                }
                if (message.intVal != null && message.hasOwnProperty('intVal')) {
                  if (!$util.isInteger(message.intVal)) { return 'intVal: integer expected' }
                }
                if (message.strVal != null && message.hasOwnProperty('strVal')) {
                  if (!$util.isString(message.strVal)) { return 'strVal: string expected' }
                }
                return null
              }

              return IntOrString
            })()

            proto.KeyToPath = (function() {
              function KeyToPath(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              KeyToPath.prototype.key = ''
              KeyToPath.prototype.path = ''
              KeyToPath.prototype.mode = 0

              KeyToPath.create = function create(properties) {
                return new KeyToPath(properties)
              }

              KeyToPath.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.key != null && Object.hasOwnProperty.call(message, 'key')) { writer.uint32(10).string(message.key) }
                if (message.path != null && Object.hasOwnProperty.call(message, 'path')) { writer.uint32(18).string(message.path) }
                if (message.mode != null && Object.hasOwnProperty.call(message, 'mode')) { writer.uint32(24).int32(message.mode) }
                return writer
              }

              KeyToPath.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              KeyToPath.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.KeyToPath()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.key = reader.string()
                      break
                    case 2:
                      message.path = reader.string()
                      break
                    case 3:
                      message.mode = reader.int32()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              KeyToPath.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              KeyToPath.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.key != null && message.hasOwnProperty('key')) {
                  if (!$util.isString(message.key)) { return 'key: string expected' }
                }
                if (message.path != null && message.hasOwnProperty('path')) {
                  if (!$util.isString(message.path)) { return 'path: string expected' }
                }
                if (message.mode != null && message.hasOwnProperty('mode')) {
                  if (!$util.isInteger(message.mode)) { return 'mode: integer expected' }
                }
                return null
              }

              return KeyToPath
            })()

            proto.MysqlCrd = (function() {
              function MysqlCrd(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              MysqlCrd.prototype.name = ''
              MysqlCrd.prototype.resourceVersion = ''
              MysqlCrd.prototype.master = null
              MysqlCrd.prototype.slave = null

              MysqlCrd.create = function create(properties) {
                return new MysqlCrd(properties)
              }

              MysqlCrd.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.resourceVersion != null && Object.hasOwnProperty.call(message, 'resourceVersion')) { writer.uint32(18).string(message.resourceVersion) }
                if (message.master != null && Object.hasOwnProperty.call(message, 'master')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.master, writer.uint32(26).fork()).ldelim() }
                if (message.slave != null && Object.hasOwnProperty.call(message, 'slave')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.slave, writer.uint32(34).fork()).ldelim() }
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
                      message.name = reader.string()
                      break
                    case 2:
                      message.resourceVersion = reader.string()
                      break
                    case 3:
                      message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32())
                      break
                    case 4:
                      message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32())
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
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.resourceVersion != null && message.hasOwnProperty('resourceVersion')) {
                  if (!$util.isString(message.resourceVersion)) { return 'resourceVersion: string expected' }
                }
                if (message.master != null && message.hasOwnProperty('master')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.master)
                  if (error) { return 'master.' + error }
                }
                if (message.slave != null && message.hasOwnProperty('slave')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.slave)
                  if (error) { return 'slave.' + error }
                }
                return null
              }

              return MysqlCrd
            })()

            proto.MysqlCrdList = (function() {
              function MysqlCrdList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              MysqlCrdList.prototype.items = $util.emptyArray

              MysqlCrdList.create = function create(properties) {
                return new MysqlCrdList(properties)
              }

              MysqlCrdList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              MysqlCrdList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              MysqlCrdList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              MysqlCrdList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              MysqlCrdList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return MysqlCrdList
            })()

            proto.NameSpace = (function() {
              function NameSpace(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              NameSpace.prototype.Name = ''

              NameSpace.create = function create(properties) {
                return new NameSpace(properties)
              }

              NameSpace.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.Name != null && Object.hasOwnProperty.call(message, 'Name')) { writer.uint32(10).string(message.Name) }
                return writer
              }

              NameSpace.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              NameSpace.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.Name = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              NameSpace.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              NameSpace.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.Name != null && message.hasOwnProperty('Name')) {
                  if (!$util.isString(message.Name)) { return 'Name: string expected' }
                }
                return null
              }

              return NameSpace
            })()

            proto.NameSpaceList = (function() {
              function NameSpaceList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              NameSpaceList.prototype.items = $util.emptyArray

              NameSpaceList.create = function create(properties) {
                return new NameSpaceList(properties)
              }

              NameSpaceList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              NameSpaceList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              NameSpaceList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              NameSpaceList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              NameSpaceList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return NameSpaceList
            })()

            proto.NodeSpec = (function() {
              function NodeSpec(properties) {
                this.containerPorts = []
                this.servicePorts = []
                this.env = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              NodeSpec.prototype.name = ''
              NodeSpec.prototype.replicas = 0
              NodeSpec.prototype.image = ''
              NodeSpec.prototype.imagePullSecrets = ''
              NodeSpec.prototype.volumePath = ''
              NodeSpec.prototype.podResource = null
              NodeSpec.prototype.containerPorts = $util.emptyArray
              NodeSpec.prototype.servicePorts = $util.emptyArray
              NodeSpec.prototype.serviceType = ''
              NodeSpec.prototype.env = $util.emptyArray
              NodeSpec.prototype.status = null

              NodeSpec.create = function create(properties) {
                return new NodeSpec(properties)
              }

              NodeSpec.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.replicas != null && Object.hasOwnProperty.call(message, 'replicas')) { writer.uint32(16).int32(message.replicas) }
                if (message.image != null && Object.hasOwnProperty.call(message, 'image')) { writer.uint32(26).string(message.image) }
                if (message.imagePullSecrets != null && Object.hasOwnProperty.call(message, 'imagePullSecrets')) { writer.uint32(34).string(message.imagePullSecrets) }
                if (message.volumePath != null && Object.hasOwnProperty.call(message, 'volumePath')) { writer.uint32(42).string(message.volumePath) }
                if (message.podResource != null && Object.hasOwnProperty.call(message, 'podResource')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.PodResourceRequirements.encode(message.podResource, writer.uint32(50).fork()).ldelim() }
                if (message.containerPorts != null && message.containerPorts.length) {
                  for (let i = 0; i < message.containerPorts.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ContainerPort.encode(message.containerPorts[i], writer.uint32(58).fork()).ldelim() }
                }
                if (message.servicePorts != null && message.servicePorts.length) {
                  for (let i = 0; i < message.servicePorts.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.encode(message.servicePorts[i], writer.uint32(66).fork()).ldelim() }
                }
                if (message.serviceType != null && Object.hasOwnProperty.call(message, 'serviceType')) { writer.uint32(74).string(message.serviceType) }
                if (message.env != null && message.env.length) {
                  for (let i = 0; i < message.env.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.EnvVar.encode(message.env[i], writer.uint32(82).fork()).ldelim() }
                }
                if (message.status != null && Object.hasOwnProperty.call(message, 'status')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Status.encode(message.status, writer.uint32(90).fork()).ldelim() }
                return writer
              }

              NodeSpec.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              NodeSpec.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
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
                    case 5:
                      message.volumePath = reader.string()
                      break
                    case 6:
                      message.podResource = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.PodResourceRequirements.decode(reader, reader.uint32())
                      break
                    case 7:
                      if (!(message.containerPorts && message.containerPorts.length)) { message.containerPorts = [] }
                      message.containerPorts.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ContainerPort.decode(reader, reader.uint32()))
                      break
                    case 8:
                      if (!(message.servicePorts && message.servicePorts.length)) { message.servicePorts = [] }
                      message.servicePorts.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.decode(reader, reader.uint32()))
                      break
                    case 9:
                      message.serviceType = reader.string()
                      break
                    case 10:
                      if (!(message.env && message.env.length)) { message.env = [] }
                      message.env.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.EnvVar.decode(reader, reader.uint32()))
                      break
                    case 11:
                      message.status = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Status.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              NodeSpec.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              NodeSpec.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
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
                if (message.volumePath != null && message.hasOwnProperty('volumePath')) {
                  if (!$util.isString(message.volumePath)) { return 'volumePath: string expected' }
                }
                if (message.podResource != null && message.hasOwnProperty('podResource')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.PodResourceRequirements.verify(message.podResource)
                  if (error) { return 'podResource.' + error }
                }
                if (message.containerPorts != null && message.hasOwnProperty('containerPorts')) {
                  if (!Array.isArray(message.containerPorts)) { return 'containerPorts: array expected' }
                  for (let i = 0; i < message.containerPorts.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ContainerPort.verify(message.containerPorts[i])
                    if (error) { return 'containerPorts.' + error }
                  }
                }
                if (message.servicePorts != null && message.hasOwnProperty('servicePorts')) {
                  if (!Array.isArray(message.servicePorts)) { return 'servicePorts: array expected' }
                  for (let i = 0; i < message.servicePorts.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.verify(message.servicePorts[i])
                    if (error) { return 'servicePorts.' + error }
                  }
                }
                if (message.serviceType != null && message.hasOwnProperty('serviceType')) {
                  if (!$util.isString(message.serviceType)) { return 'serviceType: string expected' }
                }
                if (message.env != null && message.hasOwnProperty('env')) {
                  if (!Array.isArray(message.env)) { return 'env: array expected' }
                  for (let i = 0; i < message.env.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.EnvVar.verify(message.env[i])
                    if (error) { return 'env.' + error }
                  }
                }
                if (message.status != null && message.hasOwnProperty('status')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Status.verify(message.status)
                  if (error) { return 'status.' + error }
                }
                return null
              }

              return NodeSpec
            })()

            proto.Param = (function() {
              function Param(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Param.prototype.service = ''
              Param.prototype.resourceType = ''
              Param.prototype.nameSpace = ''
              Param.prototype.watchEventType = ''
              Param.prototype.harborRequest = null

              Param.create = function create(properties) {
                return new Param(properties)
              }

              Param.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.service != null && Object.hasOwnProperty.call(message, 'service')) { writer.uint32(10).string(message.service) }
                if (message.resourceType != null && Object.hasOwnProperty.call(message, 'resourceType')) { writer.uint32(18).string(message.resourceType) }
                if (message.nameSpace != null && Object.hasOwnProperty.call(message, 'nameSpace')) { writer.uint32(26).string(message.nameSpace) }
                if (message.watchEventType != null && Object.hasOwnProperty.call(message, 'watchEventType')) { writer.uint32(34).string(message.watchEventType) }
                if (message.harborRequest != null && Object.hasOwnProperty.call(message, 'harborRequest')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRequest.encode(message.harborRequest, writer.uint32(42).fork()).ldelim() }
                return writer
              }

              Param.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Param.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.service = reader.string()
                      break
                    case 2:
                      message.resourceType = reader.string()
                      break
                    case 3:
                      message.nameSpace = reader.string()
                      break
                    case 4:
                      message.watchEventType = reader.string()
                      break
                    case 5:
                      message.harborRequest = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRequest.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Param.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Param.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.service != null && message.hasOwnProperty('service')) {
                  if (!$util.isString(message.service)) { return 'service: string expected' }
                }
                if (message.resourceType != null && message.hasOwnProperty('resourceType')) {
                  if (!$util.isString(message.resourceType)) { return 'resourceType: string expected' }
                }
                if (message.nameSpace != null && message.hasOwnProperty('nameSpace')) {
                  if (!$util.isString(message.nameSpace)) { return 'nameSpace: string expected' }
                }
                if (message.watchEventType != null && message.hasOwnProperty('watchEventType')) {
                  if (!$util.isString(message.watchEventType)) { return 'watchEventType: string expected' }
                }
                if (message.harborRequest != null && message.hasOwnProperty('harborRequest')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRequest.verify(message.harborRequest)
                  if (error) { return 'harborRequest.' + error }
                }
                return null
              }

              return Param
            })()

            proto.PodResourceRequirements = (function() {
              function PodResourceRequirements(properties) {
                this.limits = {}
                this.requests = {}
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              PodResourceRequirements.prototype.limits = $util.emptyObject
              PodResourceRequirements.prototype.requests = $util.emptyObject

              PodResourceRequirements.create = function create(properties) {
                return new PodResourceRequirements(properties)
              }

              PodResourceRequirements.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.limits != null && Object.hasOwnProperty.call(message, 'limits')) {
                  for (let keys = Object.keys(message.limits), i = 0; i < keys.length; ++i) { writer.uint32(10).fork().uint32(10).string(keys[i]).uint32(18).string(message.limits[keys[i]]).ldelim() }
                }
                if (message.requests != null && Object.hasOwnProperty.call(message, 'requests')) {
                  for (let keys = Object.keys(message.requests), i = 0; i < keys.length; ++i) { writer.uint32(18).fork().uint32(10).string(keys[i]).uint32(18).string(message.requests[keys[i]]).ldelim() }
                }
                return writer
              }

              PodResourceRequirements.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              PodResourceRequirements.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.PodResourceRequirements(); let key
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      reader.skip().pos++
                      if (message.limits === $util.emptyObject) { message.limits = {} }
                      key = reader.string()
                      reader.pos++
                      message.limits[key] = reader.string()
                      break
                    case 2:
                      reader.skip().pos++
                      if (message.requests === $util.emptyObject) { message.requests = {} }
                      key = reader.string()
                      reader.pos++
                      message.requests[key] = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              PodResourceRequirements.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              PodResourceRequirements.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.limits != null && message.hasOwnProperty('limits')) {
                  if (!$util.isObject(message.limits)) { return 'limits: object expected' }
                  const key = Object.keys(message.limits)
                  for (let i = 0; i < key.length; ++i) {
                    if (!$util.isString(message.limits[key[i]])) { return 'limits: string{k:string} expected' }
                  }
                }
                if (message.requests != null && message.hasOwnProperty('requests')) {
                  if (!$util.isObject(message.requests)) { return 'requests: object expected' }
                  const key = Object.keys(message.requests)
                  for (let i = 0; i < key.length; ++i) {
                    if (!$util.isString(message.requests[key[i]])) { return 'requests: string{k:string} expected' }
                  }
                }
                return null
              }

              return PodResourceRequirements
            })()

            proto.RedisCrd = (function() {
              function RedisCrd(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              RedisCrd.prototype.name = ''
              RedisCrd.prototype.resourceVersion = ''
              RedisCrd.prototype.master = null
              RedisCrd.prototype.slave = null

              RedisCrd.create = function create(properties) {
                return new RedisCrd(properties)
              }

              RedisCrd.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.resourceVersion != null && Object.hasOwnProperty.call(message, 'resourceVersion')) { writer.uint32(18).string(message.resourceVersion) }
                if (message.master != null && Object.hasOwnProperty.call(message, 'master')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.master, writer.uint32(26).fork()).ldelim() }
                if (message.slave != null && Object.hasOwnProperty.call(message, 'slave')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.slave, writer.uint32(34).fork()).ldelim() }
                return writer
              }

              RedisCrd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              RedisCrd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.resourceVersion = reader.string()
                      break
                    case 3:
                      message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32())
                      break
                    case 4:
                      message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              RedisCrd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              RedisCrd.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.resourceVersion != null && message.hasOwnProperty('resourceVersion')) {
                  if (!$util.isString(message.resourceVersion)) { return 'resourceVersion: string expected' }
                }
                if (message.master != null && message.hasOwnProperty('master')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.master)
                  if (error) { return 'master.' + error }
                }
                if (message.slave != null && message.hasOwnProperty('slave')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.slave)
                  if (error) { return 'slave.' + error }
                }
                return null
              }

              return RedisCrd
            })()

            proto.RedisCrdList = (function() {
              function RedisCrdList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              RedisCrdList.prototype.items = $util.emptyArray

              RedisCrdList.create = function create(properties) {
                return new RedisCrdList(properties)
              }

              RedisCrdList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              RedisCrdList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              RedisCrdList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              RedisCrdList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              RedisCrdList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return RedisCrdList
            })()

            proto.Request = (function() {
              function Request(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Request.prototype.param = null
              Request.prototype.data = $util.newBuffer([])

              Request.create = function create(properties) {
                return new Request(properties)
              }

              Request.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.param != null && Object.hasOwnProperty.call(message, 'param')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.encode(message.param, writer.uint32(10).fork()).ldelim() }
                if (message.data != null && Object.hasOwnProperty.call(message, 'data')) { writer.uint32(18).bytes(message.data) }
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
                      message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.decode(reader, reader.uint32())
                      break
                    case 2:
                      message.data = reader.bytes()
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
                if (message.param != null && message.hasOwnProperty('param')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(message.param)
                  if (error) { return 'param.' + error }
                }
                if (message.data != null && message.hasOwnProperty('data')) {
                  if (!(message.data && typeof message.data.length === 'number' || $util.isString(message.data))) { return 'data: buffer expected' }
                }
                return null
              }

              return Request
            })()

            proto.ResourceList = (function() {
              function ResourceList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ResourceList.prototype.items = $util.emptyArray

              ResourceList.create = function create(properties) {
                return new ResourceList(properties)
              }

              ResourceList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { writer.uint32(10).string(message.items[i]) }
                }
                return writer
              }

              ResourceList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ResourceList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push(reader.string())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ResourceList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ResourceList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    if (!$util.isString(message.items[i])) { return 'items: string[] expected' }
                  }
                }
                return null
              }

              return ResourceList
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
              Response.prototype.param = null
              Response.prototype.result = $util.newBuffer([])

              Response.create = function create(properties) {
                return new Response(properties)
              }

              Response.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.code != null && Object.hasOwnProperty.call(message, 'code')) { writer.uint32(8).int32(message.code) }
                if (message.param != null && Object.hasOwnProperty.call(message, 'param')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.encode(message.param, writer.uint32(18).fork()).ldelim() }
                if (message.result != null && Object.hasOwnProperty.call(message, 'result')) { writer.uint32(26).bytes(message.result) }
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
                      message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.decode(reader, reader.uint32())
                      break
                    case 3:
                      message.result = reader.bytes()
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
                if (message.param != null && message.hasOwnProperty('param')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(message.param)
                  if (error) { return 'param.' + error }
                }
                if (message.result != null && message.hasOwnProperty('result')) {
                  if (!(message.result && typeof message.result.length === 'number' || $util.isString(message.result))) { return 'result: buffer expected' }
                }
                return null
              }

              return Response
            })()

            proto.Secret = (function() {
              function Secret(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Secret.prototype.name = ''
              Secret.prototype.nameSpace = ''

              Secret.create = function create(properties) {
                return new Secret(properties)
              }

              Secret.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.nameSpace != null && Object.hasOwnProperty.call(message, 'nameSpace')) { writer.uint32(18).string(message.nameSpace) }
                return writer
              }

              Secret.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Secret.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Secret()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.nameSpace = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Secret.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Secret.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.nameSpace != null && message.hasOwnProperty('nameSpace')) {
                  if (!$util.isString(message.nameSpace)) { return 'nameSpace: string expected' }
                }
                return null
              }

              return Secret
            })()

            proto.SecretList = (function() {
              function SecretList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              SecretList.prototype.items = $util.emptyArray

              SecretList.create = function create(properties) {
                return new SecretList(properties)
              }

              SecretList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Secret.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              SecretList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              SecretList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.SecretList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Secret.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              SecretList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              SecretList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Secret.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return SecretList
            })()

            proto.Service = (function() {
              function Service(properties) {
                this.ports = []
                this.externalIPs = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Service.prototype.Name = ''
              Service.prototype.ports = $util.emptyArray
              Service.prototype.clusterIP = ''
              Service.prototype.type = ''
              Service.prototype.externalIPs = $util.emptyArray

              Service.create = function create(properties) {
                return new Service(properties)
              }

              Service.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.Name != null && Object.hasOwnProperty.call(message, 'Name')) { writer.uint32(10).string(message.Name) }
                if (message.ports != null && message.ports.length) {
                  for (let i = 0; i < message.ports.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.encode(message.ports[i], writer.uint32(18).fork()).ldelim() }
                }
                if (message.clusterIP != null && Object.hasOwnProperty.call(message, 'clusterIP')) { writer.uint32(26).string(message.clusterIP) }
                if (message.type != null && Object.hasOwnProperty.call(message, 'type')) { writer.uint32(34).string(message.type) }
                if (message.externalIPs != null && message.externalIPs.length) {
                  for (let i = 0; i < message.externalIPs.length; ++i) { writer.uint32(42).string(message.externalIPs[i]) }
                }
                return writer
              }

              Service.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Service.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.Name = reader.string()
                      break
                    case 2:
                      if (!(message.ports && message.ports.length)) { message.ports = [] }
                      message.ports.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.decode(reader, reader.uint32()))
                      break
                    case 3:
                      message.clusterIP = reader.string()
                      break
                    case 4:
                      message.type = reader.string()
                      break
                    case 5:
                      if (!(message.externalIPs && message.externalIPs.length)) { message.externalIPs = [] }
                      message.externalIPs.push(reader.string())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Service.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Service.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.Name != null && message.hasOwnProperty('Name')) {
                  if (!$util.isString(message.Name)) { return 'Name: string expected' }
                }
                if (message.ports != null && message.hasOwnProperty('ports')) {
                  if (!Array.isArray(message.ports)) { return 'ports: array expected' }
                  for (let i = 0; i < message.ports.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.verify(message.ports[i])
                    if (error) { return 'ports.' + error }
                  }
                }
                if (message.clusterIP != null && message.hasOwnProperty('clusterIP')) {
                  if (!$util.isString(message.clusterIP)) { return 'clusterIP: string expected' }
                }
                if (message.type != null && message.hasOwnProperty('type')) {
                  if (!$util.isString(message.type)) { return 'type: string expected' }
                }
                if (message.externalIPs != null && message.hasOwnProperty('externalIPs')) {
                  if (!Array.isArray(message.externalIPs)) { return 'externalIPs: array expected' }
                  for (let i = 0; i < message.externalIPs.length; ++i) {
                    if (!$util.isString(message.externalIPs[i])) { return 'externalIPs: string[] expected' }
                  }
                }
                return null
              }

              return Service
            })()

            proto.ServiceList = (function() {
              function ServiceList(properties) {
                this.items = []
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ServiceList.prototype.items = $util.emptyArray

              ServiceList.create = function create(properties) {
                return new ServiceList(properties)
              }

              ServiceList.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.items != null && message.items.length) {
                  for (let i = 0; i < message.items.length; ++i) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.encode(message.items[i], writer.uint32(10).fork()).ldelim() }
                }
                return writer
              }

              ServiceList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ServiceList.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      if (!(message.items && message.items.length)) { message.items = [] }
                      message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.decode(reader, reader.uint32()))
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ServiceList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ServiceList.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.items != null && message.hasOwnProperty('items')) {
                  if (!Array.isArray(message.items)) { return 'items: array expected' }
                  for (let i = 0; i < message.items.length; ++i) {
                    const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.verify(message.items[i])
                    if (error) { return 'items.' + error }
                  }
                }
                return null
              }

              return ServiceList
            })()

            proto.ServicePort = (function() {
              function ServicePort(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              ServicePort.prototype.name = ''
              ServicePort.prototype.protocol = ''
              ServicePort.prototype.port = 0
              ServicePort.prototype.targetPort = null
              ServicePort.prototype.nodePort = 0

              ServicePort.create = function create(properties) {
                return new ServicePort(properties)
              }

              ServicePort.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.protocol != null && Object.hasOwnProperty.call(message, 'protocol')) { writer.uint32(18).string(message.protocol) }
                if (message.port != null && Object.hasOwnProperty.call(message, 'port')) { writer.uint32(24).int32(message.port) }
                if (message.targetPort != null && Object.hasOwnProperty.call(message, 'targetPort')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.encode(message.targetPort, writer.uint32(34).fork()).ldelim() }
                if (message.nodePort != null && Object.hasOwnProperty.call(message, 'nodePort')) { writer.uint32(40).int32(message.nodePort) }
                return writer
              }

              ServicePort.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              ServicePort.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.protocol = reader.string()
                      break
                    case 3:
                      message.port = reader.int32()
                      break
                    case 4:
                      message.targetPort = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.decode(reader, reader.uint32())
                      break
                    case 5:
                      message.nodePort = reader.int32()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              ServicePort.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              ServicePort.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.protocol != null && message.hasOwnProperty('protocol')) {
                  if (!$util.isString(message.protocol)) { return 'protocol: string expected' }
                }
                if (message.port != null && message.hasOwnProperty('port')) {
                  if (!$util.isInteger(message.port)) { return 'port: integer expected' }
                }
                if (message.targetPort != null && message.hasOwnProperty('targetPort')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.verify(message.targetPort)
                  if (error) { return 'targetPort.' + error }
                }
                if (message.nodePort != null && message.hasOwnProperty('nodePort')) {
                  if (!$util.isInteger(message.nodePort)) { return 'nodePort: integer expected' }
                }
                return null
              }

              return ServicePort
            })()

            proto.Status = (function() {
              function Status(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Status.prototype.observedGeneration = $util.Long ? $util.Long.fromBits(0, 0, false) : 0
              Status.prototype.replicas = 0
              Status.prototype.readyReplicas = 0
              Status.prototype.currentReplicas = 0
              Status.prototype.updatedReplicas = 0
              Status.prototype.currentRevision = ''
              Status.prototype.updateRevision = ''
              Status.prototype.collisionCount = 0

              Status.create = function create(properties) {
                return new Status(properties)
              }

              Status.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.observedGeneration != null && Object.hasOwnProperty.call(message, 'observedGeneration')) { writer.uint32(8).int64(message.observedGeneration) }
                if (message.replicas != null && Object.hasOwnProperty.call(message, 'replicas')) { writer.uint32(16).int32(message.replicas) }
                if (message.readyReplicas != null && Object.hasOwnProperty.call(message, 'readyReplicas')) { writer.uint32(24).int32(message.readyReplicas) }
                if (message.currentReplicas != null && Object.hasOwnProperty.call(message, 'currentReplicas')) { writer.uint32(32).int32(message.currentReplicas) }
                if (message.updatedReplicas != null && Object.hasOwnProperty.call(message, 'updatedReplicas')) { writer.uint32(40).int32(message.updatedReplicas) }
                if (message.currentRevision != null && Object.hasOwnProperty.call(message, 'currentRevision')) { writer.uint32(50).string(message.currentRevision) }
                if (message.updateRevision != null && Object.hasOwnProperty.call(message, 'updateRevision')) { writer.uint32(58).string(message.updateRevision) }
                if (message.collisionCount != null && Object.hasOwnProperty.call(message, 'collisionCount')) { writer.uint32(72).int32(message.collisionCount) }
                return writer
              }

              Status.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Status.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Status()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.observedGeneration = reader.int64()
                      break
                    case 2:
                      message.replicas = reader.int32()
                      break
                    case 3:
                      message.readyReplicas = reader.int32()
                      break
                    case 4:
                      message.currentReplicas = reader.int32()
                      break
                    case 5:
                      message.updatedReplicas = reader.int32()
                      break
                    case 6:
                      message.currentRevision = reader.string()
                      break
                    case 7:
                      message.updateRevision = reader.string()
                      break
                    case 9:
                      message.collisionCount = reader.int32()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Status.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Status.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.observedGeneration != null && message.hasOwnProperty('observedGeneration')) {
                  if (!$util.isInteger(message.observedGeneration) && !(message.observedGeneration && $util.isInteger(message.observedGeneration.low) && $util.isInteger(message.observedGeneration.high))) { return 'observedGeneration: integer|Long expected' }
                }
                if (message.replicas != null && message.hasOwnProperty('replicas')) {
                  if (!$util.isInteger(message.replicas)) { return 'replicas: integer expected' }
                }
                if (message.readyReplicas != null && message.hasOwnProperty('readyReplicas')) {
                  if (!$util.isInteger(message.readyReplicas)) { return 'readyReplicas: integer expected' }
                }
                if (message.currentReplicas != null && message.hasOwnProperty('currentReplicas')) {
                  if (!$util.isInteger(message.currentReplicas)) { return 'currentReplicas: integer expected' }
                }
                if (message.updatedReplicas != null && message.hasOwnProperty('updatedReplicas')) {
                  if (!$util.isInteger(message.updatedReplicas)) { return 'updatedReplicas: integer expected' }
                }
                if (message.currentRevision != null && message.hasOwnProperty('currentRevision')) {
                  if (!$util.isString(message.currentRevision)) { return 'currentRevision: string expected' }
                }
                if (message.updateRevision != null && message.hasOwnProperty('updateRevision')) {
                  if (!$util.isString(message.updateRevision)) { return 'updateRevision: string expected' }
                }
                if (message.collisionCount != null && message.hasOwnProperty('collisionCount')) {
                  if (!$util.isInteger(message.collisionCount)) { return 'collisionCount: integer expected' }
                }
                return null
              }

              return Status
            })()

            proto.Volume = (function() {
              function Volume(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              Volume.prototype.name = ''
              Volume.prototype.volumeSource = null

              Volume.create = function create(properties) {
                return new Volume(properties)
              }

              Volume.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.volumeSource != null && Object.hasOwnProperty.call(message, 'volumeSource')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeSource.encode(message.volumeSource, writer.uint32(18).fork()).ldelim() }
                return writer
              }

              Volume.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              Volume.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Volume()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.volumeSource = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeSource.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              Volume.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              Volume.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.volumeSource != null && message.hasOwnProperty('volumeSource')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeSource.verify(message.volumeSource)
                  if (error) { return 'volumeSource.' + error }
                }
                return null
              }

              return Volume
            })()

            proto.VolumeMount = (function() {
              function VolumeMount(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              VolumeMount.prototype.name = ''
              VolumeMount.prototype.readOnly = false
              VolumeMount.prototype.mountPath = ''
              VolumeMount.prototype.subPath = ''
              VolumeMount.prototype.subPathExpr = ''

              VolumeMount.create = function create(properties) {
                return new VolumeMount(properties)
              }

              VolumeMount.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.readOnly != null && Object.hasOwnProperty.call(message, 'readOnly')) { writer.uint32(16).bool(message.readOnly) }
                if (message.mountPath != null && Object.hasOwnProperty.call(message, 'mountPath')) { writer.uint32(26).string(message.mountPath) }
                if (message.subPath != null && Object.hasOwnProperty.call(message, 'subPath')) { writer.uint32(34).string(message.subPath) }
                if (message.subPathExpr != null && Object.hasOwnProperty.call(message, 'subPathExpr')) { writer.uint32(50).string(message.subPathExpr) }
                return writer
              }

              VolumeMount.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              VolumeMount.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeMount()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.readOnly = reader.bool()
                      break
                    case 3:
                      message.mountPath = reader.string()
                      break
                    case 4:
                      message.subPath = reader.string()
                      break
                    case 6:
                      message.subPathExpr = reader.string()
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              VolumeMount.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              VolumeMount.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.readOnly != null && message.hasOwnProperty('readOnly')) {
                  if (typeof message.readOnly !== 'boolean') { return 'readOnly: boolean expected' }
                }
                if (message.mountPath != null && message.hasOwnProperty('mountPath')) {
                  if (!$util.isString(message.mountPath)) { return 'mountPath: string expected' }
                }
                if (message.subPath != null && message.hasOwnProperty('subPath')) {
                  if (!$util.isString(message.subPath)) { return 'subPath: string expected' }
                }
                if (message.subPathExpr != null && message.hasOwnProperty('subPathExpr')) {
                  if (!$util.isString(message.subPathExpr)) { return 'subPathExpr: string expected' }
                }
                return null
              }

              return VolumeMount
            })()

            proto.VolumeSource = (function() {
              function VolumeSource(properties) {
                if (properties) {
                  for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
                  }
                }
              }

              VolumeSource.prototype.name = ''
              VolumeSource.prototype.configMap = null

              VolumeSource.create = function create(properties) {
                return new VolumeSource(properties)
              }

              VolumeSource.encode = function encode(message, writer) {
                if (!writer) { writer = $Writer.create() }
                if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(10).string(message.name) }
                if (message.configMap != null && Object.hasOwnProperty.call(message, 'configMap')) { $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapVolumeSource.encode(message.configMap, writer.uint32(18).fork()).ldelim() }
                return writer
              }

              VolumeSource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim()
              }

              VolumeSource.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
                const end = length === undefined ? reader.len : reader.pos + length; const message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.VolumeSource()
                while (reader.pos < end) {
                  const tag = reader.uint32()
                  switch (tag >>> 3) {
                    case 1:
                      message.name = reader.string()
                      break
                    case 2:
                      message.configMap = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapVolumeSource.decode(reader, reader.uint32())
                      break
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }
                return message
              }

              VolumeSource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
                return this.decode(reader, reader.uint32())
              }

              VolumeSource.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) { return 'object expected' }
                if (message.name != null && message.hasOwnProperty('name')) {
                  if (!$util.isString(message.name)) { return 'name: string expected' }
                }
                if (message.configMap != null && message.hasOwnProperty('configMap')) {
                  const error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapVolumeSource.verify(message.configMap)
                  if (error) { return 'configMap.' + error }
                }
                return null
              }

              return VolumeSource
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
