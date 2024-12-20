export const JS_CODE_SNIPPET = `function removeDuplicates(nums) {
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
      if (nums[j] !== nums[i]) {
        i++;
        nums[i] = nums[j];
      }
    }
    return i + 1;
}`;

export const PYTHON_CODE_SNIPPET = `def removeDuplicates(nums):
i = 0
for j in range(1, len(nums)):
  if nums[j] != nums[i]:
    i += 1
    nums[i] = nums[j]
return i + 1`;
