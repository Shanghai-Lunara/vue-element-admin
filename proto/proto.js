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
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.replicas != null && message.hasOwnProperty("replicas"))
                                    object.replicas = message.replicas;
                                if (message.image != null && message.hasOwnProperty("image"))
                                    object.image = message.image;
                                if (message.imagePullSecrets != null && message.hasOwnProperty("imagePullSecrets"))
                                    object.imagePullSecrets = message.imagePullSecrets;
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

                        proto.Request = (function() {

                            function Request(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Request.prototype.param = null;
                            Request.prototype.data = "";

                            Request.create = function create(properties) {
                                return new Request(properties);
                            };

                            Request.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.param != null && Object.hasOwnProperty.call(message, "param"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.encode(message.param, writer.uint32(10).fork()).ldelim();
                                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                                    writer.uint32(18).string(message.data);
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
                                        message.data = reader.string();
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
                                    if (!$util.isString(message.data))
                                        return "data: string expected";
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
                                    message.data = String(object.data);
                                return message;
                            };

                            Request.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.param = null;
                                    object.data = "";
                                }
                                if (message.param != null && message.hasOwnProperty("param"))
                                    object.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.toObject(message.param, options);
                                if (message.data != null && message.hasOwnProperty("data"))
                                    object.data = message.data;
                                return object;
                            };

                            Request.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Request;
                        })();

                        proto.Resources = (function() {

                            function Resources(properties) {
                                this.resources = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            Resources.prototype.resources = $util.emptyArray;

                            Resources.create = function create(properties) {
                                return new Resources(properties);
                            };

                            Resources.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.resources != null && message.resources.length)
                                    for (let i = 0; i < message.resources.length; ++i)
                                        writer.uint32(10).string(message.resources[i]);
                                return writer;
                            };

                            Resources.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            Resources.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Resources();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        if (!(message.resources && message.resources.length))
                                            message.resources = [];
                                        message.resources.push(reader.string());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            Resources.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            Resources.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.resources != null && message.hasOwnProperty("resources")) {
                                    if (!Array.isArray(message.resources))
                                        return "resources: array expected";
                                    for (let i = 0; i < message.resources.length; ++i)
                                        if (!$util.isString(message.resources[i]))
                                            return "resources: string[] expected";
                                }
                                return null;
                            };

                            Resources.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Resources)
                                    return object;
                                let message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Resources();
                                if (object.resources) {
                                    if (!Array.isArray(object.resources))
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.Resources.resources: array expected");
                                    message.resources = [];
                                    for (let i = 0; i < object.resources.length; ++i)
                                        message.resources[i] = String(object.resources[i]);
                                }
                                return message;
                            };

                            Resources.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.resources = [];
                                if (message.resources && message.resources.length) {
                                    object.resources = [];
                                    for (let j = 0; j < message.resources.length; ++j)
                                        object.resources[j] = message.resources[j];
                                }
                                return object;
                            };

                            Resources.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Resources;
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
                            Response.prototype.result = "";

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
                                    writer.uint32(26).string(message.result);
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
                                        message.result = reader.string();
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
                                    if (!$util.isString(message.result))
                                        return "result: string expected";
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
                                    message.result = String(object.result);
                                return message;
                            };

                            Response.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.code = 0;
                                    object.param = null;
                                    object.result = "";
                                }
                                if (message.code != null && message.hasOwnProperty("code"))
                                    object.code = message.code;
                                if (message.param != null && message.hasOwnProperty("param"))
                                    object.param = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.toObject(message.param, options);
                                if (message.result != null && message.hasOwnProperty("result"))
                                    object.result = message.result;
                                return object;
                            };

                            Response.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Response;
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
