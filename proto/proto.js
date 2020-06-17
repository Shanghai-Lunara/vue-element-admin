/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.github = (function() {

    /**
     * Namespace github.
     * @exports github
     * @namespace
     */
    var github = {};

    github.com = (function() {

        /**
         * Namespace com.
         * @memberof github
         * @namespace
         */
        var com = {};

        com.nevercase = (function() {

            /**
             * Namespace nevercase.
             * @memberof github.com
             * @namespace
             */
            var nevercase = {};

            nevercase.k8s_controller_custom_resource = (function() {

                /**
                 * Namespace k8s_controller_custom_resource.
                 * @memberof github.com.nevercase
                 * @namespace
                 */
                var k8s_controller_custom_resource = {};

                k8s_controller_custom_resource.api = (function() {

                    /**
                     * Namespace api.
                     * @memberof github.com.nevercase.k8s_controller_custom_resource
                     * @namespace
                     */
                    var api = {};

                    api.proto = (function() {

                        /**
                         * Namespace proto.
                         * @memberof github.com.nevercase.k8s_controller_custom_resource.api
                         * @namespace
                         */
                        var proto = {};

                        proto.MysqlCrd = (function() {

                            /**
                             * Properties of a MysqlCrd.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @interface IMysqlCrd
                             * @property {string|null} [Name] MysqlCrd Name
                             * @property {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec|null} [master] MysqlCrd master
                             * @property {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec|null} [slave] MysqlCrd slave
                             */

                            /**
                             * Constructs a new MysqlCrd.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @classdesc Represents a MysqlCrd.
                             * @implements IMysqlCrd
                             * @constructor
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlCrd=} [properties] Properties to set
                             */
                            function MysqlCrd(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * MysqlCrd Name.
                             * @member {string} Name
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @instance
                             */
                            MysqlCrd.prototype.Name = "";

                            /**
                             * MysqlCrd master.
                             * @member {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec|null|undefined} master
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @instance
                             */
                            MysqlCrd.prototype.master = null;

                            /**
                             * MysqlCrd slave.
                             * @member {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec|null|undefined} slave
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @instance
                             */
                            MysqlCrd.prototype.slave = null;

                            /**
                             * Creates a new MysqlCrd instance using the specified properties.
                             * @function create
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlCrd=} [properties] Properties to set
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd} MysqlCrd instance
                             */
                            MysqlCrd.create = function create(properties) {
                                return new MysqlCrd(properties);
                            };

                            /**
                             * Encodes the specified MysqlCrd message. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.verify|verify} messages.
                             * @function encode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlCrd} message MysqlCrd message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            MysqlCrd.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.Name);
                                if (message.master != null && Object.hasOwnProperty.call(message, "master"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.encode(message.master, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                                if (message.slave != null && Object.hasOwnProperty.call(message, "slave"))
                                    $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.encode(message.slave, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified MysqlCrd message, length delimited. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlCrd} message MysqlCrd message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            MysqlCrd.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a MysqlCrd message from the specified reader or buffer.
                             * @function decode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd} MysqlCrd
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            MysqlCrd.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.Name = reader.string();
                                        break;
                                    case 2:
                                        message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.decode(reader, reader.uint32());
                                        break;
                                    case 3:
                                        message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.decode(reader, reader.uint32());
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a MysqlCrd message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd} MysqlCrd
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            MysqlCrd.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a MysqlCrd message.
                             * @function verify
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            MysqlCrd.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    if (!$util.isString(message.Name))
                                        return "Name: string expected";
                                if (message.master != null && message.hasOwnProperty("master")) {
                                    var error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify(message.master);
                                    if (error)
                                        return "master." + error;
                                }
                                if (message.slave != null && message.hasOwnProperty("slave")) {
                                    var error = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify(message.slave);
                                    if (error)
                                        return "slave." + error;
                                }
                                return null;
                            };

                            /**
                             * Creates a MysqlCrd message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd} MysqlCrd
                             */
                            MysqlCrd.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd)
                                    return object;
                                var message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd();
                                if (object.Name != null)
                                    message.Name = String(object.Name);
                                if (object.master != null) {
                                    if (typeof object.master !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.master: object expected");
                                    message.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.fromObject(object.master);
                                }
                                if (object.slave != null) {
                                    if (typeof object.slave !== "object")
                                        throw TypeError(".github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.slave: object expected");
                                    message.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.fromObject(object.slave);
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a MysqlCrd message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd} message MysqlCrd
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            MysqlCrd.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (options.defaults) {
                                    object.Name = "";
                                    object.master = null;
                                    object.slave = null;
                                }
                                if (message.Name != null && message.hasOwnProperty("Name"))
                                    object.Name = message.Name;
                                if (message.master != null && message.hasOwnProperty("master"))
                                    object.master = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.toObject(message.master, options);
                                if (message.slave != null && message.hasOwnProperty("slave"))
                                    object.slave = $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.toObject(message.slave, options);
                                return object;
                            };

                            /**
                             * Converts this MysqlCrd to JSON.
                             * @function toJSON
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            MysqlCrd.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return MysqlCrd;
                        })();

                        proto.MysqlSpec = (function() {

                            /**
                             * Properties of a MysqlSpec.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @interface IMysqlSpec
                             * @property {string|null} [Name] MysqlSpec Name
                             * @property {number|null} [replicas] MysqlSpec replicas
                             * @property {string|null} [image] MysqlSpec image
                             * @property {string|null} [imagePullSecrets] MysqlSpec imagePullSecrets
                             */

                            /**
                             * Constructs a new MysqlSpec.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @classdesc Represents a MysqlSpec.
                             * @implements IMysqlSpec
                             * @constructor
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec=} [properties] Properties to set
                             */
                            function MysqlSpec(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * MysqlSpec Name.
                             * @member {string} Name
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @instance
                             */
                            MysqlSpec.prototype.Name = "";

                            /**
                             * MysqlSpec replicas.
                             * @member {number} replicas
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @instance
                             */
                            MysqlSpec.prototype.replicas = 0;

                            /**
                             * MysqlSpec image.
                             * @member {string} image
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @instance
                             */
                            MysqlSpec.prototype.image = "";

                            /**
                             * MysqlSpec imagePullSecrets.
                             * @member {string} imagePullSecrets
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @instance
                             */
                            MysqlSpec.prototype.imagePullSecrets = "";

                            /**
                             * Creates a new MysqlSpec instance using the specified properties.
                             * @function create
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec=} [properties] Properties to set
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec} MysqlSpec instance
                             */
                            MysqlSpec.create = function create(properties) {
                                return new MysqlSpec(properties);
                            };

                            /**
                             * Encodes the specified MysqlSpec message. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify|verify} messages.
                             * @function encode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec} message MysqlSpec message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            MysqlSpec.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.Name != null && Object.hasOwnProperty.call(message, "Name"))
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.Name);
                                if (message.replicas != null && Object.hasOwnProperty.call(message, "replicas"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.replicas);
                                if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.image);
                                if (message.imagePullSecrets != null && Object.hasOwnProperty.call(message, "imagePullSecrets"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.imagePullSecrets);
                                return writer;
                            };

                            /**
                             * Encodes the specified MysqlSpec message, length delimited. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IMysqlSpec} message MysqlSpec message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            MysqlSpec.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a MysqlSpec message from the specified reader or buffer.
                             * @function decode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec} MysqlSpec
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            MysqlSpec.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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

                            /**
                             * Decodes a MysqlSpec message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec} MysqlSpec
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            MysqlSpec.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a MysqlSpec message.
                             * @function verify
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            MysqlSpec.verify = function verify(message) {
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

                            /**
                             * Creates a MysqlSpec message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec} MysqlSpec
                             */
                            MysqlSpec.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec)
                                    return object;
                                var message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec();
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

                            /**
                             * Creates a plain object from a MysqlSpec message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec} message MysqlSpec
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            MysqlSpec.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
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

                            /**
                             * Converts this MysqlSpec to JSON.
                             * @function toJSON
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlSpec
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            MysqlSpec.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return MysqlSpec;
                        })();

                        proto.Request = (function() {

                            /**
                             * Properties of a Request.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @interface IRequest
                             * @property {string|null} [service] Request service
                             * @property {string|null} [data] Request data
                             */

                            /**
                             * Constructs a new Request.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @classdesc Represents a Request.
                             * @implements IRequest
                             * @constructor
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IRequest=} [properties] Properties to set
                             */
                            function Request(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * Request service.
                             * @member {string} service
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @instance
                             */
                            Request.prototype.service = "";

                            /**
                             * Request data.
                             * @member {string} data
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @instance
                             */
                            Request.prototype.data = "";

                            /**
                             * Creates a new Request instance using the specified properties.
                             * @function create
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IRequest=} [properties] Properties to set
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Request} Request instance
                             */
                            Request.create = function create(properties) {
                                return new Request(properties);
                            };

                            /**
                             * Encodes the specified Request message. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.verify|verify} messages.
                             * @function encode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IRequest} message Request message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Request.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.service != null && Object.hasOwnProperty.call(message, "service"))
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.service);
                                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
                                return writer;
                            };

                            /**
                             * Encodes the specified Request message, length delimited. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IRequest} message Request message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Request.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a Request message from the specified reader or buffer.
                             * @function decode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Request} Request
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Request.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.service = reader.string();
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

                            /**
                             * Decodes a Request message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Request} Request
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Request.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a Request message.
                             * @function verify
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Request.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.service != null && message.hasOwnProperty("service"))
                                    if (!$util.isString(message.service))
                                        return "service: string expected";
                                if (message.data != null && message.hasOwnProperty("data"))
                                    if (!$util.isString(message.data))
                                        return "data: string expected";
                                return null;
                            };

                            /**
                             * Creates a Request message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Request} Request
                             */
                            Request.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request)
                                    return object;
                                var message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request();
                                if (object.service != null)
                                    message.service = String(object.service);
                                if (object.data != null)
                                    message.data = String(object.data);
                                return message;
                            };

                            /**
                             * Creates a plain object from a Request message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.Request} message Request
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            Request.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (options.defaults) {
                                    object.service = "";
                                    object.data = "";
                                }
                                if (message.service != null && message.hasOwnProperty("service"))
                                    object.service = message.service;
                                if (message.data != null && message.hasOwnProperty("data"))
                                    object.data = message.data;
                                return object;
                            };

                            /**
                             * Converts this Request to JSON.
                             * @function toJSON
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Request
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            Request.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return Request;
                        })();

                        proto.Response = (function() {

                            /**
                             * Properties of a Response.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @interface IResponse
                             * @property {number|null} [code] Response code
                             * @property {string|null} [result] Response result
                             */

                            /**
                             * Constructs a new Response.
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto
                             * @classdesc Represents a Response.
                             * @implements IResponse
                             * @constructor
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IResponse=} [properties] Properties to set
                             */
                            function Response(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * Response code.
                             * @member {number} code
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @instance
                             */
                            Response.prototype.code = 0;

                            /**
                             * Response result.
                             * @member {string} result
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @instance
                             */
                            Response.prototype.result = "";

                            /**
                             * Creates a new Response instance using the specified properties.
                             * @function create
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IResponse=} [properties] Properties to set
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Response} Response instance
                             */
                            Response.create = function create(properties) {
                                return new Response(properties);
                            };

                            /**
                             * Encodes the specified Response message. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.verify|verify} messages.
                             * @function encode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IResponse} message Response message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Response.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                                if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.result);
                                return writer;
                            };

                            /**
                             * Encodes the specified Response message, length delimited. Does not implicitly {@link github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.IResponse} message Response message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            Response.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a Response message from the specified reader or buffer.
                             * @function decode
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Response} Response
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Response.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.code = reader.int32();
                                        break;
                                    case 2:
                                        message.result = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a Response message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Response} Response
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            Response.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a Response message.
                             * @function verify
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Response.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.code != null && message.hasOwnProperty("code"))
                                    if (!$util.isInteger(message.code))
                                        return "code: integer expected";
                                if (message.result != null && message.hasOwnProperty("result"))
                                    if (!$util.isString(message.result))
                                        return "result: string expected";
                                return null;
                            };

                            /**
                             * Creates a Response message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {github.com.nevercase.k8s_controller_custom_resource.api.proto.Response} Response
                             */
                            Response.fromObject = function fromObject(object) {
                                if (object instanceof $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response)
                                    return object;
                                var message = new $root.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response();
                                if (object.code != null)
                                    message.code = object.code | 0;
                                if (object.result != null)
                                    message.result = String(object.result);
                                return message;
                            };

                            /**
                             * Creates a plain object from a Response message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @static
                             * @param {github.com.nevercase.k8s_controller_custom_resource.api.proto.Response} message Response
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            Response.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (options.defaults) {
                                    object.code = 0;
                                    object.result = "";
                                }
                                if (message.code != null && message.hasOwnProperty("code"))
                                    object.code = message.code;
                                if (message.result != null && message.hasOwnProperty("result"))
                                    object.result = message.result;
                                return object;
                            };

                            /**
                             * Converts this Response to JSON.
                             * @function toJSON
                             * @memberof github.com.nevercase.k8s_controller_custom_resource.api.proto.Response
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
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

module.exports = $root;
