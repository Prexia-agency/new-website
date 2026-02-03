/**
 * TSL Shader Helper Functions for Galaxy Simulation
 *
 * This module contains reusable shader functions written in Three.js Shading Language (TSL).
 * These functions run on the GPU and handle particle physics, rotation, and positioning.
 */

import type Node from "three/src/nodes/core/Node.js";
import type NodeBuilder from "three/src/nodes/core/NodeBuilder.js";
import { vec3, float, Fn, length, normalize, sin, cos, fract } from "three/tsl";

// ==============================================================================
// RANDOM NUMBER GENERATION
// ==============================================================================

/**
 * Improved hash function for pseudo-random number generation
 * Avoids precision loss with large seed values by normalizing first
 *
 * @param seed - Random seed value
 * @returns Random value between 0 and 1
 */
export const hash = Fn<[Node]>(([seed], _builder: NodeBuilder) => {
  const p = fract(seed.mul(0.1031));
  const h = p.add(19.19);
  const x = fract(h.mul(h.add(47.43)).mul(p));
  return x;
});

// ==============================================================================
// ROTATION & PHYSICS
// ==============================================================================

/**
 * Rotates a 2D position (x, z) around the Y-axis using rotation matrix:
 *
 * | cos(θ)  -sin(θ) |   | x |
 * | sin(θ)   cos(θ) | * | z |
 *
 * This is a pedagogical implementation showing the rotation matrix clearly.
 *
 * @param position - 3D position to rotate
 * @param angle - Rotation angle in radians (counter-clockwise)
 * @returns Rotated position
 */
export const rotateXZ = Fn<[Node, Node]>(
  ([position, angle], _builder: NodeBuilder) => {
    const cosTheta = cos(angle);
    const sinTheta = sin(angle);

    const newX = position.x.mul(cosTheta).sub(position.z.mul(sinTheta));
    const newZ = position.x.mul(sinTheta).add(position.z.mul(cosTheta));

    return vec3(newX, position.y, newZ);
  },
);

/**
 * Applies differential rotation based on distance from center
 * Inner regions rotate faster than outer regions (like a real galaxy)
 *
 * The rotation factor uses: 1 / (distance * 0.1 + 1)
 * This creates faster rotation near the center, slower at the edges.
 *
 * @param position - Current position
 * @param rotationSpeed - Base rotation speed
 * @param deltaTime - Time step
 * @returns Rotated position
 */
export const applyDifferentialRotation = Fn<[Node, Node, Node]>(
  ([position, rotationSpeed, deltaTime], _builder: NodeBuilder) => {
    // Calculate rotation factor: inner regions rotate faster
    const distFromCenter = length(vec3(position.x, 0, position.z));
    const rotationFactor = float(1.0).div(distFromCenter.mul(0.1).add(1.0));

    // Calculate angular speed and apply rotation
    const angularSpeed = rotationSpeed
      .mul(rotationFactor)
      .mul(deltaTime)
      .negate();

    return rotateXZ(position, angularSpeed);
  },
);

/**
 * Calculates mouse interaction force
 * Repels particles away from mouse position with falloff based on distance
 *
 * Force = direction * strength * influence * deltaTime
 * Influence = 1 - (distance / radius), clamped to [0, 1]
 *
 * @param position - Particle position
 * @param mouse - Mouse world position
 * @param mouseActive - Whether mouse is pressed (0 or 1)
 * @param mouseForce - Strength of mouse force
 * @param mouseRadius - Radius of mouse influence
 * @param deltaTime - Time step
 * @returns Force vector to apply
 */
export const applyMouseForce = Fn<[Node, Node, Node, Node, Node, Node]>(
  (
    [position, mouse, mouseActive, mouseForce, mouseRadius, deltaTime],
    _builder: NodeBuilder,
  ) => {
    const toMouse = mouse.sub(position);
    const distToMouse = length(toMouse);

    // Calculate influence with distance falloff
    const mouseInfluence = mouseActive.mul(
      float(1.0).sub(distToMouse.div(mouseRadius)).max(0.0),
    );

    // Push particles away from mouse (negate direction)
    const mouseDir = normalize(toMouse);
    return mouseDir.mul(mouseForce).mul(mouseInfluence).mul(deltaTime).negate();
  },
);

/**
 * Applies spring force to restore particle to original position
 * Uses Hooke's law: F = k * (target - current)
 *
 * @param currentPos - Current particle position
 * @param targetPos - Target (original) position
 * @param strength - Spring strength constant
 * @param deltaTime - Time step
 * @returns Force vector to apply
 */
export const applySpringForce = Fn<[Node, Node, Node, Node]>(
  ([currentPos, targetPos, strength, deltaTime], _builder: NodeBuilder) => {
    const toTarget = targetPos.sub(currentPos);
    return toTarget.mul(strength).mul(deltaTime);
  },
);
