/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const github = $root.github = (() => {

    const github = {};

    github.com = (function() {

        const com = {};

        com.nevercase = (function() {

            const nevercase = {};

            nevercase.k8s_controller_custom_resource = (function() {

                const k8s_controller_custom_resource = {};

                k8s_controller_custom_resource.api = (function() {

                    const api = {};

                    api.proto = (function() {

                        const proto = {};

                        proto.ConfigMap = (function() {

                            function ConfigMap(properties) {
                                this.data = {};
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            ConfigMap.prototype.Name = "";
                            ConfigMap.prototype.data = $util.emptyObject;

                            ConfigMap.create = function create(properties) {
                                return new ConfigMap(properties);
                            };

                            ConfigMap.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                                    for (let keys = Object.keys(message.data), i = 0; i < keys.length; ++i)
                                        writer.uint32(18).fork().uint32(10).string(keys[i]).uint32(18).string(message.data[keys[i]]).ldelim();
                                return writer;
                            };

                            ConfigMap.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            ConfigMap.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap(), key;
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        reader.skip().pos++;
                                        if (message.data === $util.emptyObject)
                                            message.data = {};
                                        key = reader.string();
                                        reader.pos++;
                                        message.data[key] = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            ConfigMap.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            ConfigMap.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.data != null && message.hasOwnProperty("data")) {
                                    if (!$util.isObject(message.data))
                                        return "data: object expected";
                                    let key = Object.keys(message.data);
                                    for (let i = 0; i < key.length; ++i)
                                        if (!$util.isString(message.data[key[i]]))
                                            return "data: string{k:string} expected";
                                }
                                return null;
                            };

                            ConfigMap.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.data) {
                                    if (typeof object.data !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.data: object expected");
                                    message.data = {};
                                    for (let keys = Object.keys(object.data), i = 0; i < keys.length; ++i)
                                        message.data[keys[i]] = String(object.data[keys[i]]);
                                }
                                return message;
                            };

                            ConfigMap.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.objects || options.defaults)
                                    object.data = {};
                                if (options.defaults)
                                    object.Name = "";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                let keys2;
                                if (message.data && (keys2 = Object.keys(message.data)).length) {
                                    object.data = {};
                                    for (let j = 0; j < keys2.length; ++j)
                                        object.data[keys2[j]] = message.data[keys2[j]];
                                }
                                return object;
                            };

                            ConfigMap.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return ConfigMap;
                        })();

                        proto.ConfigMapList = (function() {

                            function ConfigMapList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            ConfigMapList.prototype.items = $util.emptyArray;

                            ConfigMapList.create = function create(properties) {
                                return new ConfigMapList(properties);
                            };

                            ConfigMapList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.encode(message.items[i], writer.uint32(10).fork()).ldelim();
                                return writer;
                            };

                            ConfigMapList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            ConfigMapList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.decode(reader, reader.uint32()));
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            ConfigMapList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            ConfigMapList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.verify(message.items[i]);
                                        if (error)
                                            return "items." + error;
                                    }
                                }
                                return null;
                            };

                            ConfigMapList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i) {
                                        if (typeof object.items[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList.items: object expected");
                                        message.items[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.fromObject(object.items[i]);
                                    }
                                }
                                return message;
                            };

                            ConfigMapList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.toObject(message.items[j], options);
                                }
                                return object;
                            };

                            ConfigMapList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return ConfigMapList;
                        })();

                        proto.IntOrString = (function() {

                            function IntOrString(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            IntOrString.prototype.type = 0;
                            IntOrString.prototype.intVal = 0;
                            IntOrString.prototype.strVal = "";

                            IntOrString.create = function create(properties) {
                                return new IntOrString(properties);
                            };

                            IntOrString.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                    writer.uint32(8).int32(message.type);
                                if (message.intVal != null && Object.hasOwnProperty.call(message, "intVal"))
                                    writer.uint32(16).int32(message.intVal);
                                if (message.strVal != null && Object.hasOwnProperty.call(message, "strVal"))
                                    writer.uint32(26).string(message.strVal);
                                return writer;
                            };

                            IntOrString.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            IntOrString.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.type = reader.int32();
                                        break;
                                    case 2:
                                        message.intVal = reader.int32();
                                        break;
                                    case 3:
                                        message.strVal = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            IntOrString.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            IntOrString.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.type != null && message.hasOwnProperty("type"))
                                    if (!$util.isInteger(message.type))
                                        return "type: integer expected";
                                if (message.intVal != null && message.hasOwnProperty("intVal"))
                                    if (!$util.isInteger(message.intVal))
                                        return "intVal: integer expected";
                                if (message.strVal != null && message.hasOwnProperty("strVal"))
                                    if (!$util.isString(message.strVal))
                                        return "strVal: string expected";
                                return null;
                            };

                            IntOrString.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString();
                                if (object.type != null)
                                    message.type = object.type | 0;
                                if (object.intVal != null)
                                    message.intVal = object.intVal | 0;
                                if (object.strVal != null)
                                    message.strVal = String(object.strVal);
                                return message;
                            };

                            IntOrString.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.type = 0;
                                    object.intVal = 0;
                                    object.strVal = "";
                                }
                                if (message.type != null && message.hasOwnProperty("type"))
                                    object.type = message.type;
                                if (message.intVal != null && message.hasOwnProperty("intVal"))
                                    object.intVal = message.intVal;
                                if (message.strVal != null && message.hasOwnProperty("strVal"))
                                    object.strVal = message.strVal;
                                return object;
                            };

                            IntOrString.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return IntOrString;
                        })();

                        proto.MysqlCrd = (function() {

                            function MysqlCrd(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            MysqlCrd.prototype.Name = "";
                            MysqlCrd.prototype.master = null;
                            MysqlCrd.prototype.slave = null;

                            MysqlCrd.create = function create(properties) {
                                return new MysqlCrd(properties);
                            };

                            MysqlCrd.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                if (message.master != null && Object.hasOwnProperty.call(message, "master"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.master, writer.uint32(18).fork()).ldelim();
                                if (message.slave != null && Object.hasOwnProperty.call(message, "slave"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.slave, writer.uint32(26).fork()).ldelim();
                                return writer;
                            };

                            MysqlCrd.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            MysqlCrd.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32());
                                        break;
                                    case 3:
                                        message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            MysqlCrd.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            MysqlCrd.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.master != null && message.hasOwnProperty("master")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.master);
                                    if (error)
                                        return "master." + error;
                                }
                                if (message.slave != null && message.hasOwnProperty("slave")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.slave);
                                    if (error)
                                        return "slave." + error;
                                }
                                return null;
                            };

                            MysqlCrd.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.master != null) {
                                    if (typeof object.master !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.master: object expected");
                                    message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.fromObject(object.master);
                                }
                                if (object.slave != null) {
                                    if (typeof object.slave !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.slave: object expected");
                                    message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.fromObject(object.slave);
                                }
                                return message;
                            };

                            MysqlCrd.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.Name = "";
                                    object.master = null;
                                    object.slave = null;
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.master != null && message.hasOwnProperty("master"))
                                    object.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.toObject(message.master, options);
                                if (message.slave != null && message.hasOwnProperty("slave"))
                                    object.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.toObject(message.slave, options);
                                return object;
                            };

                            MysqlCrd.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return MysqlCrd;
                        })();

                        proto.MysqlCrdList = (function() {

                            function MysqlCrdList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            MysqlCrdList.prototype.items = $util.emptyArray;

                            MysqlCrdList.create = function create(properties) {
                                return new MysqlCrdList(properties);
                            };

                            MysqlCrdList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.encode(message.items[i], writer.uint32(10).fork()).ldelim();
                                return writer;
                            };

                            MysqlCrdList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            MysqlCrdList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.decode(reader, reader.uint32()));
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            MysqlCrdList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            MysqlCrdList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.verify(message.items[i]);
                                        if (error)
                                            return "items." + error;
                                    }
                                }
                                return null;
                            };

                            MysqlCrdList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i) {
                                        if (typeof object.items[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList.items: object expected");
                                        message.items[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.fromObject(object.items[i]);
                                    }
                                }
                                return message;
                            };

                            MysqlCrdList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.toObject(message.items[j], options);
                                }
                                return object;
                            };

                            MysqlCrdList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return MysqlCrdList;
                        })();

                        proto.NameSpace = (function() {

                            function NameSpace(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            NameSpace.prototype.Name = "";

                            NameSpace.create = function create(properties) {
                                return new NameSpace(properties);
                            };

                            NameSpace.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                return writer;
                            };

                            NameSpace.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            NameSpace.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            NameSpace.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            NameSpace.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                return null;
                            };

                            NameSpace.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                return message;
                            };

                            NameSpace.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults)
                                    object.Name = "";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                return object;
                            };

                            NameSpace.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return NameSpace;
                        })();

                        proto.NameSpaceList = (function() {

                            function NameSpaceList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            NameSpaceList.prototype.items = $util.emptyArray;

                            NameSpaceList.create = function create(properties) {
                                return new NameSpaceList(properties);
                            };

                            NameSpaceList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.encode(message.items[i], writer.uint32(10).fork()).ldelim();
                                return writer;
                            };

                            NameSpaceList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            NameSpaceList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.decode(reader, reader.uint32()));
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            NameSpaceList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            NameSpaceList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.verify(message.items[i]);
                                        if (error)
                                            return "items." + error;
                                    }
                                }
                                return null;
                            };

                            NameSpaceList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i) {
                                        if (typeof object.items[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList.items: object expected");
                                        message.items[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.fromObject(object.items[i]);
                                    }
                                }
                                return message;
                            };

                            NameSpaceList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpace.toObject(message.items[j], options);
                                }
                                return object;
                            };

                            NameSpaceList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return NameSpaceList;
                        })();

                        proto.NodeSpec = (function() {

                            function NodeSpec(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            NodeSpec.prototype.Name = "";
                            NodeSpec.prototype.replicas = 0;
                            NodeSpec.prototype.image = "";
                            NodeSpec.prototype.imagePullSecrets = "";
                            NodeSpec.prototype.volumePath = "";

                            NodeSpec.create = function create(properties) {
                                return new NodeSpec(properties);
                            };

                            NodeSpec.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                if (message.replicas != null && Object.hasOwnProperty.call(message, "replicas"))
                                    writer.uint32(16).int32(message.replicas);
                                if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                                    writer.uint32(26).string(message.image);
                                if (message.imagePullSecrets != null && Object.hasOwnProperty.call(message, "imagePullSecrets"))
                                    writer.uint32(34).string(message.imagePullSecrets);
                                if (message.volumePath != null && Object.hasOwnProperty.call(message, "volumePath"))
                                    writer.uint32(42).string(message.volumePath);
                                return writer;
                            };

                            NodeSpec.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            NodeSpec.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        message.replicas = reader.int32();
                                        break;
                                    case 3:
                                        message.image = reader.string();
                                        break;
                                    case 4:
                                        message.imagePullSecrets = reader.string();
                                        break;
                                    case 5:
                                        message.volumePath = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            NodeSpec.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            NodeSpec.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.replicas != null && message.hasOwnProperty("replicas"))
                                    if (!$util.isInteger(message.replicas))
                                        return "replicas: integer expected";
                                if (message.image != null && message.hasOwnProperty("image"))
                                    if (!$util.isString(message.image))
                                        return "image: string expected";
                                if (message.imagePullSecrets != null && message.hasOwnProperty("imagePullSecrets"))
                                    if (!$util.isString(message.imagePullSecrets))
                                        return "imagePullSecrets: string expected";
                                if (message.volumePath != null && message.hasOwnProperty("volumePath"))
                                    if (!$util.isString(message.volumePath))
                                        return "volumePath: string expected";
                                return null;
                            };

                            NodeSpec.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.replicas != null)
                                    message.replicas = object.replicas | 0;
                                if (object.image != null)
                                    message.image = String(object.image);
                                if (object.imagePullSecrets != null)
                                    message.imagePullSecrets = String(object.imagePullSecrets);
                                if (object.volumePath != null)
                                    message.volumePath = String(object.volumePath);
                                return message;
                            };

                            NodeSpec.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.Name = "";
                                    object.replicas = 0;
                                    object.image = "";
                                    object.imagePullSecrets = "";
                                    object.volumePath = "";
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.replicas != null && message.hasOwnProperty("replicas"))
                                    object.replicas = message.replicas;
                                if (message.image != null && message.hasOwnProperty("image"))
                                    object.image = message.image;
                                if (message.imagePullSecrets != null && message.hasOwnProperty("imagePullSecrets"))
                                    object.imagePullSecrets = message.imagePullSecrets;
                                if (message.volumePath != null && message.hasOwnProperty("volumePath"))
                                    object.volumePath = message.volumePath;
                                return object;
                            };

                            NodeSpec.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return NodeSpec;
                        })();

                        proto.Param = (function() {

                            function Param(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Param.prototype.service = "";
                            Param.prototype.resourceType = "";
                            Param.prototype.nameSpace = "";

                            Param.create = function create(properties) {
                                return new Param(properties);
                            };

                            Param.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.service != null && Object.hasOwnProperty.call(message, "service"))
                                    writer.uint32(10).string(message.service);
                                if (message.resourceType != null && Object.hasOwnProperty.call(message, "resourceType"))
                                    writer.uint32(18).string(message.resourceType);
                                if (message.nameSpace != null && Object.hasOwnProperty.call(message, "nameSpace"))
                                    writer.uint32(26).string(message.nameSpace);
                                return writer;
                            };

                            Param.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            Param.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.service = reader.string();
                                        break;
                                    case 2:
                                        message.resourceType = reader.string();
                                        break;
                                    case 3:
                                        message.nameSpace = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            Param.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            Param.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.service != null && message.hasOwnProperty("service"))
                                    if (!$util.isString(message.service))
                                        return "service: string expected";
                                if (message.resourceType != null && message.hasOwnProperty("resourceType"))
                                    if (!$util.isString(message.resourceType))
                                        return "resourceType: string expected";
                                if (message.nameSpace != null && message.hasOwnProperty("nameSpace"))
                                    if (!$util.isString(message.nameSpace))
                                        return "nameSpace: string expected";
                                return null;
                            };

                            Param.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param();
                                if (object.service != null)
                                    message.service = String(object.service);
                                if (object.resourceType != null)
                                    message.resourceType = String(object.resourceType);
                                if (object.nameSpace != null)
                                    message.nameSpace = String(object.nameSpace);
                                return message;
                            };

                            Param.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.service = "";
                                    object.resourceType = "";
                                    object.nameSpace = "";
                                }
                                if (message.service != null && message.hasOwnProperty("service"))
                                    object.service = message.service;
                                if (message.resourceType != null && message.hasOwnProperty("resourceType"))
                                    object.resourceType = message.resourceType;
                                if (message.nameSpace != null && message.hasOwnProperty("nameSpace"))
                                    object.nameSpace = message.nameSpace;
                                return object;
                            };

                            Param.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Param;
                        })();

                        proto.RedisCrd = (function() {

                            function RedisCrd(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            RedisCrd.prototype.Name = "";
                            RedisCrd.prototype.master = null;
                            RedisCrd.prototype.slave = null;

                            RedisCrd.create = function create(properties) {
                                return new RedisCrd(properties);
                            };

                            RedisCrd.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                if (message.master != null && Object.hasOwnProperty.call(message, "master"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.master, writer.uint32(18).fork()).ldelim();
                                if (message.slave != null && Object.hasOwnProperty.call(message, "slave"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.encode(message.slave, writer.uint32(26).fork()).ldelim();
                                return writer;
                            };

                            RedisCrd.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            RedisCrd.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32());
                                        break;
                                    case 3:
                                        message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.decode(reader, reader.uint32());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            RedisCrd.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            RedisCrd.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.master != null && message.hasOwnProperty("master")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.master);
                                    if (error)
                                        return "master." + error;
                                }
                                if (message.slave != null && message.hasOwnProperty("slave")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.verify(message.slave);
                                    if (error)
                                        return "slave." + error;
                                }
                                return null;
                            };

                            RedisCrd.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.master != null) {
                                    if (typeof object.master !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.master: object expected");
                                    message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.fromObject(object.master);
                                }
                                if (object.slave != null) {
                                    if (typeof object.slave !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.slave: object expected");
                                    message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.fromObject(object.slave);
                                }
                                return message;
                            };

                            RedisCrd.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.Name = "";
                                    object.master = null;
                                    object.slave = null;
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.master != null && message.hasOwnProperty("master"))
                                    object.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.toObject(message.master, options);
                                if (message.slave != null && message.hasOwnProperty("slave"))
                                    object.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.NodeSpec.toObject(message.slave, options);
                                return object;
                            };

                            RedisCrd.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return RedisCrd;
                        })();

                        proto.RedisCrdList = (function() {

                            function RedisCrdList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            RedisCrdList.prototype.items = $util.emptyArray;

                            RedisCrdList.create = function create(properties) {
                                return new RedisCrdList(properties);
                            };

                            RedisCrdList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.encode(message.items[i], writer.uint32(10).fork()).ldelim();
                                return writer;
                            };

                            RedisCrdList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            RedisCrdList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.decode(reader, reader.uint32()));
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            RedisCrdList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            RedisCrdList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.verify(message.items[i]);
                                        if (error)
                                            return "items." + error;
                                    }
                                }
                                return null;
                            };

                            RedisCrdList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i) {
                                        if (typeof object.items[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList.items: object expected");
                                        message.items[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.fromObject(object.items[i]);
                                    }
                                }
                                return message;
                            };

                            RedisCrdList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.toObject(message.items[j], options);
                                }
                                return object;
                            };

                            RedisCrdList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return RedisCrdList;
                        })();

                        proto.Request = (function() {

                            function Request(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Request.prototype.param = null;
                            Request.prototype.data = $util.newBuffer([]);

                            Request.create = function create(properties) {
                                return new Request(properties);
                            };

                            Request.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.encode(message.param, writer.uint32(10).fork()).ldelim();
                                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                                    writer.uint32(18).bytes(message.data);
                                return writer;
                            };

                            Request.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            Request.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.decode(reader, reader.uint32());
                                        break;
                                    case 2:
                                        message.data = reader.bytes();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            Request.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            Request.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.param != null && message.hasOwnProperty("param")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(message.param);
                                    if (error)
                                        return "param." + error;
                                }
                                if (message.data != null && message.hasOwnProperty("data"))
                                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                                        return "data: buffer expected";
                                return null;
                            };

                            Request.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request();
                                if (object.param != null) {
                                    if (typeof object.param !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.param: object expected");
                                    message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.fromObject(object.param);
                                }
                                if (object.data != null)
                                    if (typeof object.data === "string")
                                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                                    else if (object.data.length)
                                        message.data = object.data;
                                return message;
                            };

                            Request.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.param = null;
                                    if (options.bytes === String)
                                        object.data = "";
                                    else {
                                        object.data = [];
                                        if (options.bytes !== Array)
                                            object.data = $util.newBuffer(object.data);
                                    }
                                }
                                if (message.param != null && message.hasOwnProperty("param"))
                                    object.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.toObject(message.param, options);
                                if (message.data != null && message.hasOwnProperty("data"))
                                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                                return object;
                            };

                            Request.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Request;
                        })();

                        proto.ResourceList = (function() {

                            function ResourceList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            ResourceList.prototype.items = $util.emptyArray;

                            ResourceList.create = function create(properties) {
                                return new ResourceList(properties);
                            };

                            ResourceList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        writer.uint32(10).string(message.items[i]);
                                return writer;
                            };

                            ResourceList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            ResourceList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push(reader.string());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            ResourceList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            ResourceList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i)
                                        if (!$util.isString(message.items[i]))
                                            return "items: string[] expected";
                                }
                                return null;
                            };

                            ResourceList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i)
                                        message.items[i] = String(object.items[i]);
                                }
                                return message;
                            };

                            ResourceList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = message.items[j];
                                }
                                return object;
                            };

                            ResourceList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return ResourceList;
                        })();

                        proto.Response = (function() {

                            function Response(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Response.prototype.code = 0;
                            Response.prototype.param = null;
                            Response.prototype.result = $util.newBuffer([]);

                            Response.create = function create(properties) {
                                return new Response(properties);
                            };

                            Response.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                                    writer.uint32(8).int32(message.code);
                                if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.encode(message.param, writer.uint32(18).fork()).ldelim();
                                if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                                    writer.uint32(26).bytes(message.result);
                                return writer;
                            };

                            Response.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            Response.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.code = reader.int32();
                                        break;
                                    case 2:
                                        message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.decode(reader, reader.uint32());
                                        break;
                                    case 3:
                                        message.result = reader.bytes();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            Response.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            Response.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.code != null && message.hasOwnProperty("code"))
                                    if (!$util.isInteger(message.code))
                                        return "code: integer expected";
                                if (message.param != null && message.hasOwnProperty("param")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(message.param);
                                    if (error)
                                        return "param." + error;
                                }
                                if (message.result != null && message.hasOwnProperty("result"))
                                    if (!(message.result && typeof message.result.length === "number" || $util.isString(message.result)))
                                        return "result: buffer expected";
                                return null;
                            };

                            Response.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response();
                                if (object.code != null)
                                    message.code = object.code | 0;
                                if (object.param != null) {
                                    if (typeof object.param !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.param: object expected");
                                    message.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.fromObject(object.param);
                                }
                                if (object.result != null)
                                    if (typeof object.result === "string")
                                        $util.base64.decode(object.result, message.result = $util.newBuffer($util.base64.length(object.result)), 0);
                                    else if (object.result.length)
                                        message.result = object.result;
                                return message;
                            };

                            Response.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.code = 0;
                                    object.param = null;
                                    if (options.bytes === String)
                                        object.result = "";
                                    else {
                                        object.result = [];
                                        if (options.bytes !== Array)
                                            object.result = $util.newBuffer(object.result);
                                    }
                                }
                                if (message.code != null && message.hasOwnProperty("code"))
                                    object.code = message.code;
                                if (message.param != null && message.hasOwnProperty("param"))
                                    object.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.toObject(message.param, options);
                                if (message.result != null && message.hasOwnProperty("result"))
                                    object.result = options.bytes === String ? $util.base64.encode(message.result, 0, message.result.length) : options.bytes === Array ? Array.prototype.slice.call(message.result) : message.result;
                                return object;
                            };

                            Response.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Response;
                        })();

                        proto.Service = (function() {

                            function Service(properties) {
                                this.ports = [];
                                this.externalIPs = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Service.prototype.Name = "";
                            Service.prototype.ports = $util.emptyArray;
                            Service.prototype.clusterIP = "";
                            Service.prototype.type = "";
                            Service.prototype.externalIPs = $util.emptyArray;

                            Service.create = function create(properties) {
                                return new Service(properties);
                            };

                            Service.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(10).string(message.Name);
                                if (message.ports != null && message.ports.length)
                                    for (let i = 0; i < message.ports.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.encode(message.ports[i], writer.uint32(18).fork()).ldelim();
                                if (message.clusterIP != null && Object.hasOwnProperty.call(message, "clusterIP"))
                                    writer.uint32(26).string(message.clusterIP);
                                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                                    writer.uint32(34).string(message.type);
                                if (message.externalIPs != null && message.externalIPs.length)
                                    for (let i = 0; i < message.externalIPs.length; ++i)
                                        writer.uint32(42).string(message.externalIPs[i]);
                                return writer;
                            };

                            Service.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            Service.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        if (!(message.ports && message.ports.length))
                                            message.ports = [];
                                        message.ports.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.decode(reader, reader.uint32()));
                                        break;
                                    case 3:
                                        message.clusterIP = reader.string();
                                        break;
                                    case 4:
                                        message.type = reader.string();
                                        break;
                                    case 5:
                                        if (!(message.externalIPs && message.externalIPs.length))
                                            message.externalIPs = [];
                                        message.externalIPs.push(reader.string());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            Service.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            Service.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.ports != null && message.hasOwnProperty("ports")) {
                                    if (!Array.isArray(message.ports))
                                        return "ports: array expected";
                                    for (let i = 0; i < message.ports.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.verify(message.ports[i]);
                                        if (error)
                                            return "ports." + error;
                                    }
                                }
                                if (message.clusterIP != null && message.hasOwnProperty("clusterIP"))
                                    if (!$util.isString(message.clusterIP))
                                        return "clusterIP: string expected";
                                if (message.type != null && message.hasOwnProperty("type"))
                                    if (!$util.isString(message.type))
                                        return "type: string expected";
                                if (message.externalIPs != null && message.hasOwnProperty("externalIPs")) {
                                    if (!Array.isArray(message.externalIPs))
                                        return "externalIPs: array expected";
                                    for (let i = 0; i < message.externalIPs.length; ++i)
                                        if (!$util.isString(message.externalIPs[i]))
                                            return "externalIPs: string[] expected";
                                }
                                return null;
                            };

                            Service.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.ports) {
                                    if (!Array.isArray(object.ports))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.ports: array expected");
                                    message.ports = [];
                                    for (let i = 0; i < object.ports.length; ++i) {
                                        if (typeof object.ports[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.ports: object expected");
                                        message.ports[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.fromObject(object.ports[i]);
                                    }
                                }
                                if (object.clusterIP != null)
                                    message.clusterIP = String(object.clusterIP);
                                if (object.type != null)
                                    message.type = String(object.type);
                                if (object.externalIPs) {
                                    if (!Array.isArray(object.externalIPs))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.externalIPs: array expected");
                                    message.externalIPs = [];
                                    for (let i = 0; i < object.externalIPs.length; ++i)
                                        message.externalIPs[i] = String(object.externalIPs[i]);
                                }
                                return message;
                            };

                            Service.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults) {
                                    object.ports = [];
                                    object.externalIPs = [];
                                }
                                if (options.defaults) {
                                    object.Name = "";
                                    object.clusterIP = "";
                                    object.type = "";
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.ports && message.ports.length) {
                                    object.ports = [];
                                    for (let j = 0; j < message.ports.length; ++j)
                                        object.ports[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.toObject(message.ports[j], options);
                                }
                                if (message.clusterIP != null && message.hasOwnProperty("clusterIP"))
                                    object.clusterIP = message.clusterIP;
                                if (message.type != null && message.hasOwnProperty("type"))
                                    object.type = message.type;
                                if (message.externalIPs && message.externalIPs.length) {
                                    object.externalIPs = [];
                                    for (let j = 0; j < message.externalIPs.length; ++j)
                                        object.externalIPs[j] = message.externalIPs[j];
                                }
                                return object;
                            };

                            Service.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Service;
                        })();

                        proto.ServiceList = (function() {

                            function ServiceList(properties) {
                                this.items = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            ServiceList.prototype.items = $util.emptyArray;

                            ServiceList.create = function create(properties) {
                                return new ServiceList(properties);
                            };

                            ServiceList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.items != null && message.items.length)
                                    for (let i = 0; i < message.items.length; ++i)
                                        $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.encode(message.items[i], writer.uint32(10).fork()).ldelim();
                                return writer;
                            };

                            ServiceList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            ServiceList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.items && message.items.length))
                                            message.items = [];
                                        message.items.push($root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.decode(reader, reader.uint32()));
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            ServiceList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            ServiceList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.items != null && message.hasOwnProperty("items")) {
                                    if (!Array.isArray(message.items))
                                        return "items: array expected";
                                    for (let i = 0; i < message.items.length; ++i) {
                                        let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.verify(message.items[i]);
                                        if (error)
                                            return "items." + error;
                                    }
                                }
                                return null;
                            };

                            ServiceList.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList();
                                if (object.items) {
                                    if (!Array.isArray(object.items))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList.items: array expected");
                                    message.items = [];
                                    for (let i = 0; i < object.items.length; ++i) {
                                        if (typeof object.items[i] !== "object")
                                            throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList.items: object expected");
                                        message.items[i] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.fromObject(object.items[i]);
                                    }
                                }
                                return message;
                            };

                            ServiceList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.items = [];
                                if (message.items && message.items.length) {
                                    object.items = [];
                                    for (let j = 0; j < message.items.length; ++j)
                                        object.items[j] = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Service.toObject(message.items[j], options);
                                }
                                return object;
                            };

                            ServiceList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return ServiceList;
                        })();

                        proto.ServicePort = (function() {

                            function ServicePort(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            ServicePort.prototype.name = "";
                            ServicePort.prototype.protocol = "";
                            ServicePort.prototype.port = 0;
                            ServicePort.prototype.targetPort = null;
                            ServicePort.prototype.nodePort = 0;

                            ServicePort.create = function create(properties) {
                                return new ServicePort(properties);
                            };

                            ServicePort.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                                    writer.uint32(10).string(message.name);
                                if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                                    writer.uint32(18).string(message.protocol);
                                if (message.port != null && Object.hasOwnProperty.call(message, "port"))
                                    writer.uint32(24).int32(message.port);
                                if (message.targetPort != null && Object.hasOwnProperty.call(message, "targetPort"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.encode(message.targetPort, writer.uint32(34).fork()).ldelim();
                                if (message.nodePort != null && Object.hasOwnProperty.call(message, "nodePort"))
                                    writer.uint32(40).int32(message.nodePort);
                                return writer;
                            };

                            ServicePort.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            ServicePort.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.name = reader.string();
                                        break;
                                    case 2:
                                        message.protocol = reader.string();
                                        break;
                                    case 3:
                                        message.port = reader.int32();
                                        break;
                                    case 4:
                                        message.targetPort = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.decode(reader, reader.uint32());
                                        break;
                                    case 5:
                                        message.nodePort = reader.int32();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            ServicePort.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            ServicePort.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.name != null && message.hasOwnProperty("name"))
                                    if (!$util.isString(message.name))
                                        return "name: string expected";
                                if (message.protocol != null && message.hasOwnProperty("protocol"))
                                    if (!$util.isString(message.protocol))
                                        return "protocol: string expected";
                                if (message.port != null && message.hasOwnProperty("port"))
                                    if (!$util.isInteger(message.port))
                                        return "port: integer expected";
                                if (message.targetPort != null && message.hasOwnProperty("targetPort")) {
                                    let error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.verify(message.targetPort);
                                    if (error)
                                        return "targetPort." + error;
                                }
                                if (message.nodePort != null && message.hasOwnProperty("nodePort"))
                                    if (!$util.isInteger(message.nodePort))
                                        return "nodePort: integer expected";
                                return null;
                            };

                            ServicePort.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort();
                                if (object.name != null)
                                    message.name = String(object.name);
                                if (object.protocol != null)
                                    message.protocol = String(object.protocol);
                                if (object.port != null)
                                    message.port = object.port | 0;
                                if (object.targetPort != null) {
                                    if (typeof object.targetPort !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.ServicePort.targetPort: object expected");
                                    message.targetPort = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.fromObject(object.targetPort);
                                }
                                if (object.nodePort != null)
                                    message.nodePort = object.nodePort | 0;
                                return message;
                            };

                            ServicePort.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.name = "";
                                    object.protocol = "";
                                    object.port = 0;
                                    object.targetPort = null;
                                    object.nodePort = 0;
                                }
                                if (message.name != null && message.hasOwnProperty("name"))
                                    object.name = message.name;
                                if (message.protocol != null && message.hasOwnProperty("protocol"))
                                    object.protocol = message.protocol;
                                if (message.port != null && message.hasOwnProperty("port"))
                                    object.port = message.port;
                                if (message.targetPort != null && message.hasOwnProperty("targetPort"))
                                    object.targetPort = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.IntOrString.toObject(message.targetPort, options);
                                if (message.nodePort != null && message.hasOwnProperty("nodePort"))
                                    object.nodePort = message.nodePort;
                                return object;
                            };

                            ServicePort.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return ServicePort;
                        })();

                        return proto;
                    })();

                    return api;
                })();

                return k8s_controller_custom_resource;
            })();

            return nevercase;
        })();

        return com;
    })();

    return github;
})();

export { $root as default };
