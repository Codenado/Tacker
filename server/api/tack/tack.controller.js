/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tacks              ->  index
 * POST    /api/tacks              ->  create
 * GET     /api/tacks/:id          ->  show
 * PUT     /api/tacks/:id          ->  update
 * DELETE  /api/tacks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Tack from './tack.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Tacks
export function index(req, res) {
  return Tack.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tack from the DB
export function show(req, res) {

  return Tack.find({ tacker: req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tack in the DB
export function create(req, res) {
  delete req.body.date;
  var tack = new Tack(_.merge({ tacker: req.user._id }, req.body));

  tack.save(function(err, tack) {
  if(err) { return handleError(res, err); }
  return res.json(201, tack);
});

}

// Updates an existing Tack in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Tack.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tack from the DB
export function destroy(req, res) {
  return Tack.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
